const fs = require('fs');

const data = fs.readFileSync('lib/mockData.ts', 'utf8');

let projectId = 0;
// We know MOCK_PROJECTS starts first and has 30 items.
// Let's just do a regex replace on posterUrl, incrementing ID or extracting it.
const updatedData = data.replace(/"id":\s*(\d+),([\s\S]*?)"posterUrl":\s*"[^"]*"/g, (match, id, between) => {
    return `"id": ${id},${between}"posterUrl": "https://picsum.photos/seed/project${id}/600/900"`;
});

fs.writeFileSync('lib/mockData.ts', updatedData);
console.log('Done replacing mockData.ts');
