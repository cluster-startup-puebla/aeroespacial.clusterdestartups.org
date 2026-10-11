import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

function flattenMetadataFile(name) {
  const asFile = path.join(outDir, name);
  if (!fs.existsSync(asFile) || !fs.statSync(asFile).isDirectory()) return;
  const nested = ["index.xml", "index.txt", "index.html"]
    .map((file) => path.join(asFile, file))
    .find((file) => fs.existsSync(file));
  if (!nested) return;
  const tmp = `${asFile}.tmp`;
  fs.renameSync(nested, tmp);
  fs.rmSync(asFile, { recursive: true, force: true });
  fs.renameSync(tmp, asFile);
}

flattenMetadataFile("sitemap.xml");
flattenMetadataFile("robots.txt");

const rootIndex = path.join(outDir, "index.html");
if (fs.existsSync(rootIndex)) fs.rmSync(rootIndex);

fs.writeFileSync(
  path.join(outDir, ".htaccess"),
  `DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^index\\.html$ /es/ [R=301,L]
  RewriteRule ^$ /es/ [R=301,L]
  RewriteRule ^sitemap\\.xml/$ /sitemap.xml [R=301,L]
  RewriteRule ^robots\\.txt/$ /robots.txt [R=301,L]
</IfModule>

ErrorDocument 404 /404.html

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json application/xml image/svg+xml
</IfModule>

<IfModule mod_headers.c>
  <Files "sitemap.xml">
    Header set Content-Type "application/xml; charset=utf-8"
  </Files>
  <Files "robots.txt">
    Header set Content-Type "text/plain; charset=utf-8"
  </Files>

  <FilesMatch "\\.(?:html|htm)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>

  <FilesMatch "\\.(?:avif|webp|gif|jpe?g|png|svg|ico|woff2)$">
    Header set Cache-Control "public, max-age=604800"
  </FilesMatch>

  <If "%{REQUEST_URI} =~ m#^/_next/static/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </If>
</IfModule>
`,
);

console.log("root 301 and .htaccess written to out/");
