const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const fsExtra = require('fs-extra');
const axios = require('axios');

async function downloadImage(url, filepath) {
    const writer = fsExtra.createWriteStream(filepath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function updateImagePaths() {
    const articlePath = path.join(__dirname, '../content/article/posts');
    const imageBasePath = path.join(__dirname, '../assets/image');
    const files = await glob(`${articlePath}/**/index.md`);

    console.log(`Found ${files.length} articles to process.`);

    for (const file of files) {
        let content = await fs.readFile(file, 'utf-8');
        let originalContent = content;

        const imgRegex = /<figure[^>]*>[\s\n]*<img[^>]+src="(https:\/\/arukayies\.com\/wp-content\/uploads\/([^"]+))"[^>]*>[\s\n]*<\/figure>|<img[^>]+src="(https:\/\/arukayies\.com\/wp-content\/uploads\/([^"]+))"[^>]*>/g;
        
        let match;
        while ((match = imgRegex.exec(originalContent)) !== null) {
            const fullMatch = match[0];
            const fullUrl = match[1] || match[3];
            const imageUrlPath = match[2] || match[4];
            
            if (!imageUrlPath || path.basename(imageUrlPath).startsWith('impression')) {
                continue;
            }

            const imageName = path.basename(imageUrlPath);
            const sourceImagePath = path.join(imageBasePath, imageUrlPath);
            const destImagePath = path.join(path.dirname(file), imageName);

            let imageExists = false;
            try {
                await fs.access(destImagePath);
                imageExists = true;
            } catch (e) {
                // Doesn't exist at destination
            }

            if (imageExists) {
                console.log(`Already exists: ${destImagePath}`);
                const newTag = `{{< custom-figure src="${imageName}" title="" Fit="1280x1280 webp q90" >}}`;
                content = content.replace(fullMatch, newTag);
                continue;
            }

            try {
                await fs.access(sourceImagePath);
                await fsExtra.move(sourceImagePath, destImagePath, { overwrite: true });
                console.log(`Moved: ${sourceImagePath} -> ${destImagePath}`);
                const newTag = `{{< custom-figure src="${imageName}" title="" Fit="1280x1280 webp q90" >}}`;
                content = content.replace(fullMatch, newTag);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    try {
                        console.log(`Downloading: ${fullUrl}`);
                        await downloadImage(fullUrl, destImagePath);
                        console.log(`Downloaded to: ${destImagePath}`);
                        const newTag = `{{< custom-figure src="${imageName}" title="" Fit="1280x1280 webp q90" >}}`;
                        content = content.replace(fullMatch, newTag);
                    } catch (downloadError) {
                        console.error(`[Download Failed] for ${fullUrl}: ${downloadError.message}`);
                    }
                } else {
                    console.error(`Error processing ${sourceImagePath}:`, err);
                }
            }
        }

        if (content !== originalContent) {
            await fs.writeFile(file, content, 'utf-8');
            console.log(`Updated article: ${file}`);
        }
    }
    console.log('Image path update process finished.');
}

updateImagePaths().catch(console.error);
