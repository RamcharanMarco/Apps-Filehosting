const File = require("../models/fileModel");
const AdmZip = require("adm-zip");

const { randomUUID } = require('crypto');

/*
 fs.unlink(path, (err) => {
  if (err) throw err //handle your error the way you want to;
  console.log('path/file.txt was deleted');//or else the file will be deleted
    });
  );
*/

//delete job
const deleteFile = async (req, res) => {
  const id = req.params.id;
  try {
    const file = await File.findOneAndDelete({ _id: id });
    if (!file) {
      return res.status(400).json({ error: "no such file" });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAllFiles = async (req, res) => {
  const id = req.params.id;
  try {
    const files = await File.deleteMany({ bucket_id: id });
    if (!files) {
      return res.status(400).json({ error: "no such files" });
    }
    res.status(200).json(files);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single job
const getFiles = async (req, res) => {
  const id = req.params.id;
  try {
    const files = await File.find({ bucket_id: id });
    res.status(200).json(files);
    console.log(files);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single job
const getFile = async (req, res) => {
  const id = req.params.id;
  try {
    const file = await File.findById(id);
    res.status(200).json(file);
    console.log(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get single job
const downloadFile = async (req, res) => {
  console.log('path hit')
  const id = req.params.id;
  try {
    const download = await File.findById(id);
    console.log('download', download)
      res.download(download.download)

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


async function createZipArchive(id, uuid) {
  try {
    const zip = new AdmZip();
    const outputFile = `${uuid}.zip`;
    zip.addLocalFolder(`./files/${id}`);
    zip.writeZip(`./zips/${outputFile}`);
    console.log(`Created ${outputFile} successfully`);
  } catch (error) {
    console.log(error);
  }
}

//get 
const downloadAllFiles = async (req, res) => {
  const id = req.params.id;
  try {
    let uuid = randomUUID()
createZipArchive(id, uuid)
      res.download(`zips/${uuid}.zip`)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




createZipArchive();







module.exports = {
  deleteFile,
  getFiles,
  deleteAllFiles,
  getFile,
  downloadFile,
  downloadAllFiles
};
