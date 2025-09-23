const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("changelogs")
    .setDescription("Afficher les nouveautés et corrections du bot Hebi"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Changelogs Hebi")
      .setColor("#B22222")
      .setDescription("Résumé des fonctionnalités disponibles et des dernières corrections.")
      .addFields(
        {
          name: "Commandes disponibles",
          value:
            "- `/infohebi` → Affiche le dashboard (API status, suggestions, report bug)\n" +
            "- `/upload` → Gérer les envois et journaux\n" +
            "- `/birthday` → Voir ton anniversaire enregistré\n" +
            "- `/birthdayadd` → Ajouter un anniversaire\n" +
            "- `/birthdaylist` → Voir la liste des anniversaires\n" +
            "- `/forgetbirthday` → Supprimer ton anniversaire\n" +
            "- `/rememberbirthday` → Recevoir un rappel de ton anniversaire\n" +
            "- `/nextbirthday` → Voir le prochain anniversaire à venir\n" +
            "- `/unsetuserbirthday` → Supprimer l’anniversaire d’un utilisateur (admin)\n" +
            "- `/unban` → Débannir un utilisateur\n" +
            "- `/generatepassword` → Générer un mot de passe sécurisé\n" +
            "- `/changelogs` → Voir les nouveautés et corrections",
          inline: false,
        },
        {
          name: "Bugs corrigés et pas encore corrigé",
          value:
            "- Commandes slash qui ne répondaient pas → corrigé\n" +
            "- Ajout de la gestion des **interactions boutons & modals** (Suggestion / Report Bug)\n" +
            "- Problème d’enregistrement des commandes slash → corrigé\n" +
            "- Sécurisation des routes API (`/verify`, `/upload-log`)\n" +
            "- Amélioration des logs (uploads + vérifications)\n" +
            "- Crash lors de l’appel à l’API Vinted sans résultats → FOUTU,
          inline: false,
        },
        {
          name: "⚙️ Statut actuel",
          value:
            "- **Base de données des anniversaires** → en cours de mise en place\n" +
            "- **API Vinted** → EST MORT VRM",
          inline: false,
        },
        {
          name: "Informations",
          value:
            "Le bot **Hebi** est en développement constant. Des mises à jour régulières sont appliquées.\n" +
            "Merci de signaler tout bug via le bouton **Report Bug** de la commande `/infohebi`.",
          inline: false,
        }
      )
      .setFooter({ text: "Hebi • Dernière mise à jour" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
