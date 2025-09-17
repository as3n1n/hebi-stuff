const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");
const FormData = require("form-data");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upload")
    .setDescription("Upload a file to Hebi")
    .addAttachmentOption(option =>
      option.setName("file")
        .setDescription("The file to upload")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const file = interaction.options.getAttachment("file");

    try {
      // Préparer le form-data
      const form = new FormData();
      form.append("fileToUpload", await fetch(file.url).then(r => r.buffer()), file.name);

      // Envoi au serveur Hebi
      const res = await fetch("https://upload.javelin.asia/upload", {
        method: "POST",
        body: form
      });

      const json = await res.json();

      if (!json.success) {
        return interaction.editReply(`❌ Upload failed: ${json.error || "Unknown error"}`);
      }

      // Réponse dans Discord
      await interaction.editReply({
        content: `✅ File uploaded!\n\n📂 **Direct link:** ${json.url}\n🔗 **Preview link:** ${json.preview}`
      });

    } catch (err) {
      console.error("Upload error:", err);
      await interaction.editReply("An error occurred while uploading the file.");
    }
  }
};
