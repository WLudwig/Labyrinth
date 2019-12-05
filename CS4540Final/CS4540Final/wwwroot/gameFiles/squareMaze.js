function generateAndPopulate() {

  grid = [];
  blockGrid = [];

  grid = generate(cols);

  //initialize to 0
  for(let i = 0;i<blockGridSize*blockGridSize;i++)
    blockGrid[i]=0;
  
  
  //set corners
  for (let y = 0; y < blockGridSize; y += 2) {
    for (let x = 0; x < blockGridSize; x += 2) {
      blockGrid[x + y * blockGridSize] = 1;
    }
  }

  for (let y = 0; y < cols; y++) {
    let blockY = y * 2 + 1;
    for (let x = 0; x < rows; x++) {

      let blockX = x * 2 + 1;

      if (x == 0 && y == 0)
        blockGrid[blockX + blockY * blockGridSize] = 2;

      if (x == cols - 1 && y == cols - 1)
        blockGrid[blockX + blockY * blockGridSize] = 3;

      let currentNode = grid[x + y * cols];
      
     
      
      if (currentNode.walls[0])
        blockGrid[blockX + (blockY - 1) * blockGridSize] = 1;

      if (currentNode.walls[1])
        blockGrid[blockX + 1 + (blockY) * blockGridSize] = 1;

      if (currentNode.walls[2])
        blockGrid[blockX + (blockY + 1) * blockGridSize] = 1;

      if (currentNode.walls[3])
        blockGrid[blockX - 1 + (blockY) * blockGridSize] = 1;
    }
  }

  return blockGrid;
  
}