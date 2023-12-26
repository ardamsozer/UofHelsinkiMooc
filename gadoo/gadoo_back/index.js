const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
// const src = path.join(__dirname, "views");
// app.use(express.static(src));

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

let projectId = "inbound-hawk-399708"; // Get this from Google Cloud
let keyFilename = `${__dirname}/key.json`; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("temp_input_bucket"); // Get this from Google Cloud -> Storage
const resultsBucket = storage.bucket('summary_output_bucket')
// const resultsBucket = bucket 

app.post("/api/upload", multer.single("file"), (req, res) => {
  console.log("Made it to /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send(req.file);
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/upload", async (req, res) => {
    console.log("Made it to /get");
    const [files] = await resultsBucket.getFiles();
    if (files.length === 0) {
        console.log('no files found...returning 404')
        return res.status(404).end()
    }
    console.log('file metadata is : ', files[0].metadata.contentType)
    if (files[0].metadata.contentType != "application/pdf") {
        console.log('file is not a pdf (probably a folder not file)')
        return res.status(500).end()
    }
    console.log(files)
    res.send([files]);
    console.log("Success");
})

// Get the main index html file
app.get("/", (req, res) => {
  res.send("hero");
  //   res.sendFile(src + "/index.html");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


