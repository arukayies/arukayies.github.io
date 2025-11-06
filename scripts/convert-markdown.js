const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const postsDir = path.join(__dirname, '../content/article/posts');

async function convertFiles() {
  try {
    const files = await glob(`${postsDir}/**/*.md`);

    files.forEach(file => {
      fs.readFile(file, 'utf8', (err, content) => {
        if (err) {
          console.error(err);
          return;
        }

        let newContent = content;

        // 1. Front Matterの整形
        newContent = newContent.replace(/type: post\n/, '');
        newContent = newContent.replace(/share: true\n/, '');
        newContent = newContent.replace(/comment: true\n/, '');
        newContent = newContent.replace(/page_type:\n  - default\n/, '');
        newContent = newContent.replace(/update_level:\n  - high\n/, '');
        newContent = newContent.replace(/the_review_type:\n  - Product\n/, '');
        newContent = newContent.replace(/the_review_rate:\n  - 2.5\n/, '');
        newContent = newContent.replace(/archives: \["\d{4}年\d{2}月"\]\n/, '');
        newContent = newContent.replace(/last_modified:\n  - \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\n/, '');
        newContent = newContent.replace(/url: .*\n/, '');
        newContent = newContent.replace(/categories:\n  - (.*)\n/, 'tags:\n  - "$1"\n');

        // 2. 本文の整形
        newContent = newContent.replace(/<\/p>\n<p>\n/g, '\n\n');
        newContent = newContent.replace(/<p>\n/g, '');
        newContent = newContent.replace(/<\/p>\n/g, '\n');

        // 3. Cocoon Blocksの置換
        // blogcard
        newContent = newContent.replace(/<div class="wp-block-cocoon-blocks-blogcard.*?<a href="([^"]*)" title="([^"]*)".*?>[\s\S]*?<\/a><\/div>/g, '{{< blog-card url="$1" title="$2" >}}');

        // tab-box
        newContent = newContent.replace(/<div class="wp-block-cocoon-blocks-tab-box-1.*?">\n  <p>\n    ([\s\S]*?)\n  <\/p>\n([\s\S]*?)\n<\/div>/g, '{{< notice info >}}\n$1\n$2\n{{< /notice >}}');

        // custom-figure
        newContent = newContent.replace(/{{< custom-figure src="([^"]*)" title="([^"]*)"[^>]*>}}\s*<\/figure>/g, '![![$2]($1)]($1)');
        newContent = newContent.replace(/{{< custom-figure src="([^"]*)" title="([^"]*)"[^>]*>}}/g, '![![$2]($1)]($1)');


        // 4. 不要なHTMLタグの削除
        newContent = newContent.replace(/<div class="cstmreba">[\s\S]*?<\/div>\n<\/div>\n/gs, '');
        newContent = newContent.replace(/<div class="wp-block-columns.*?>\n  <div class="wp-block-column.*?>\n/g, '');
        newContent = newContent.replace(/<\/div>\n  \n  <div class="wp-block-column.*?>\n/g, '');
        newContent = newContent.replace(/<\/div>\n<\/div>\n/g, '');
        newContent = newContent.replace(/<a rel="nofollow".*?>\s*{{< custom-figure src=".*?" title=""[^>]*>}}\s*<\/a>\s*{{< custom-figure src=".*?" title=""[^>]*>}}/g, '');


        fs.writeFile(file, newContent, 'utf8', (err) => {
          if (err) {
            console.error(`Error writing file: ${file}`);
            console.error(err);
          } else {
            console.log(`Successfully converted: ${file}`);
          }
        });
      });
    });
  } catch (err) {
    console.error(err);
  }
}

convertFiles();
