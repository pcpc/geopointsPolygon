const fs = require("fs");
const path = require("path");

// Read command line argument for the GeoJSON file name
const inputFile = process.argv[2];

if (!inputFile) {
  console.error("Please provide a GeoJSON file as an argument.");
  process.exit(1);
}

// Read the GeoJSON file
fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading GeoJSON file:", err);
    return;
  }

  let geojsonData;
  try {
    geojsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error("Error parsing GeoJSON:", parseErr);
    return;
  }

  // Function to convert GeoJSON to CSV string
  function geojsonToCSV(geojson) {
    let coords = geojson.features[0].geometry.coordinates[0];
    return coords.map((pair) => pair.join(" ")).join(", ");
  }

  // Convert
  const csvContent = geojsonToCSV(geojsonData);

  // Output file name based on the input file name
  const outputFile = path.basename(inputFile, path.extname(inputFile)) + ".txt";

  // Write to file
  fs.writeFile(outputFile, csvContent, "utf8", (writeErr) => {
    if (writeErr) throw writeErr;
    console.log(`The file has been saved as ${outputFile}!`);
  });
});
