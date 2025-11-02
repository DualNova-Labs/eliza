const axios = require("axios").default;
const path = require("path");
const fs = require("fs");
const setPic = require("./getPic");
const genIndex = require("./genIndex");
const {
  generateMarkupLocal,
  generateMarkupRemote,
} = require("./generateMarkup");

require("dotenv").config();

if (!process.env.NAME) throw new Error("Please specify NAME in environment.");
if (!process.env.PIC) throw new Error("Please specify PIC in environment.");

const picPath = process.env.PIC;
const msgPath = process.env.SCROLL_MSG;

//Local initialization
const setLocalData = async () => {
  try {
    const pic = path.join(__dirname, "../local/", picPath);
    let markup = "";
    if (msgPath) {
      const text = fs.readFileSync(path.join(__dirname, "../local/", msgPath), {
        encoding: "utf-8",
      });
      markup = generateMarkupLocal(text);
    }
    await setPic(pic);
    genIndex(markup);
  } catch (e) {
    throw new Error(e.message);
  }
};

//Remote initialization
const setRemoteData = async () => {
  try {
    let pic;
    
    // Check if PIC is a URL or a local file path
    if (picPath.startsWith('http://') || picPath.startsWith('https://')) {
      console.log("Fetching image from URL:", picPath);
      let res = await axios.get(picPath, {
        responseType: "arraybuffer",
      });
      pic = res.data;
    } else {
      // Use local file from repository (e.g., assets/eliza.jpg)
      console.log("Reading image from repository:", picPath);
      const localPicPath = path.join(__dirname, "../", picPath);
      pic = fs.readFileSync(localPicPath);
    }
    
    let markup = "";
    if (msgPath) {
      console.log("Fetching scroll message from:", msgPath);
      const article = msgPath.split("/").pop();
      let res = await axios.get(
        `https://api.telegra.ph/getPage/${article}?return_content=true`
      );
      const { content } = res.data.result;
      markup = content.reduce(
        (string, node) => string + generateMarkupRemote(node),
        ""
      );
    }
    await setPic(pic);
    genIndex(markup);
  } catch (e) {
    console.error("Error details:", e.message);
    console.error("PIC value:", picPath);
    console.error("SCROLL_MSG value:", msgPath);
    throw new Error(`Failed to fetch remote data: ${e.message}`);
  }
};

if (process.argv[2] === "--local") setLocalData();
else if (process.argv[2] === "--remote") setRemoteData();
else console.log("Fetch mode not specified.");
