export function getFilePath(file){
    const filePath = file.path;
    const fileSplit = filePath.split('avatar\\')[1];

    return "avatar/" + fileSplit;
}