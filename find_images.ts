import * as fs from 'fs';
import * as path from 'path';

function findFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    if (file === 'node_modules' || file === '.git' || file === '.cache') {
      return;
    }
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

try {
  const files = findFiles('.');
  console.log('--- ALL FILES ---');
  files.forEach(f => console.log(f));
  console.log('--------------------');
} catch (err: any) {
  console.error('Error listing files:', err.message);
}
