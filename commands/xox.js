const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
class TicTacToe {
  /**
   * @name TicTacToe
   * @kind 
   * @param {Object} options
   * @param {String} [options.xEmoji] 
   * @param {any} [options.m
   * essage] 
   * @param {String} [options.xrenk] 
   * @param {String} [options.oEmoji]
   * @param {String} [options.orenk] 
   * @param {any} [options.opponent]
   */

  constructor(options) {
    if (options.xEmoji) this.xEmoji = options.xEmoji;
    else this.xEmoji = "❌";
    if (options.oEmoji) this.oEmoji = options.oEmoji;
    else this.oEmoji = "⭕";
    if (options.xrenk) this.xrenk = options.xrenk;
    else this.xrenk = "BLURPLE";
    if (options.orenk) this.orenk = options.orenk;
    else this.orenk = "BLURPLE";
    if (!options.opponent) throw new TypeError("Kullanıcıyı düzgünce belirt.");
    if (!options.message) throw new TypeError("Kullanıcıyı düzgünce belirt.");
    this.message = options.message;
    this.opponent = options.opponent;
  }
  async start() {
    let [a1, a2, a3, b1, b2, b3, c1, c2, c3] = getBoarder();
    let [a11, a22, a33, b11, b22, b33, c11, c22, c33] = getIds();
    let [A1, A2, A3, B1, B2, B3, C1, C2, C3] = getButtons();
    const author = this.message.author.id;
    const member = this.opponent;
    const authorName = this.message.author.username;
    const gameData = [
      {
        member: this.message.author,
        em: this.xEmoji,
        color: this.xrenk,
      },
      {
        member: member,
        em: this.oEmoji,
        color: this.orenk,
      },
    ];
    let player = Math.floor(Math.random() * gameData.length);
    const midDuel = new Set();

    if (midDuel.has(author)) {
      return this.message.channel.send(`Aktif olarak oynadıgın bir oyun var zaten.`);
    } else if (midDuel.has(member.id)) {
      return this.message.channel.send(`<@${member.id}> şu anda bir düelloda`);
    }
    if (member.id === this.message.client.user.id) {
      return;
    }

    let Embed;
    if (player == 0) {
      Embed = new MessageEmbed()
        .setTitle(`__**${authorName}**__ VS ${this.opponent.username}`)
        .setDescription(`**${authorName}** Sıra sende.`)
        .setColor(3426654);
    } else {
      Embed = new MessageEmbed()
        .setTitle(`${authorName} VS __**${this.opponent.username}**__`)
        .setDescription(`**${this.opponent.username}** Sıra sende.`)
        .setColor(3426654);
    }

    this.message
      .reply({
        embeds: [Embed],
        components: [
          new MessageActionRow().addComponents([A1, A2, A3]),
          new MessageActionRow().addComponents([B1, B2, B3]),
          new MessageActionRow().addComponents([C1, C2, C3]),
        ],
      })
      .then(async (msg) => {
        midDuel.add(author);
        midDuel.add(member.id);
        const gameCollector = msg.createMessageComponentCollector({
          filter: (i) =>
            i?.isButton() &&
            i?.user &&
            (i?.user.id == this.message.author.id ||
              i?.user.id == this.opponent.id) &&
            i?.message.author.id == this.message.client.user.id,
        });

        gameCollector.on("collect", async (btn) => {
          if (
            btn.customId == a11 &&
            gameData[player].member.id === btn.user.id
          ) {
            btn.deferUpdate();
            if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
              btn.message.update("O buttona zaten tıklamışlar.");
            } else {
              try {
                a1 = gameData[player].em;
                if (
                  (a1 == this.xEmoji &&
                    b1 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b1 == this.oEmoji &&
                    c1 == this.oEmoji) ||
                  (a2 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c2 == this.xEmoji) ||
                  (a2 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c2 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b3 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a3 == this.oEmoji &&
                    b3 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    a2 == this.xEmoji &&
                    a3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    a2 == this.oEmoji &&
                    a3 == this.oEmoji) ||
                  (b1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    b3 == this.xEmoji) ||
                  (b1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    b3 == this.oEmoji) ||
                  (c1 == this.xEmoji &&
                    c2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (c1 == this.oEmoji &&
                    c2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                ) {
                  this.message.channel.send(
                    `Tebrikler! ${gameData[player].member} Sen kazandın.`
                  );
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                } else if (
                  a1 !== "⬜" &&
                  a2 !== "⬜" &&
                  a3 !== "⬜" &&
                  b1 !== "⬜" &&
                  b2 !== "⬜" &&
                  b3 !== "⬜" &&
                  c1 !== "⬜" &&
                  c2 !== "⬜" &&
                  c3 !== "⬜"
                ) {
                  this.message.channel.send(`Oyun berabere bitti`);
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                }
              } catch (e) {
                console.log(e.stack ? e.stack : e);
              }
              player = (player + 1) % 2;
              if (player == 0) {
                Embed = new MessageEmbed()
                  .setDescription(
                    `__**${authorName}**__ VS ${this.opponent.username}`
                  )
                  .setColor(3426654);
              } else {
                Embed = new MessageEmbed()
                  .setDescription(
                    `${authorName} VS __**${this.opponent.username}**__`
                  )
                  .setColor(3426654);
              }
              A1 = new MessageButton()
                .setCustomId(a11)
                .setStyle(`${gameData[player].color}`)
                .setEmoji(gameData[player].em)
                .setDisabled();
            }
          } else if (
            btn.customId == a22 &&
            gameData[player].member.id === btn.user.id
          ) {
            btn.deferUpdate();
            if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
              btn.message.update("O buttona zaten tıklamışlar.");
            } else {
              try {
                a2 = gameData[player].em;
                if (
                  (a1 == this.xEmoji &&
                    b1 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b1 == this.oEmoji &&
                    c1 == this.oEmoji) ||
                  (a2 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c2 == this.xEmoji) ||
                  (a2 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c2 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b3 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a3 == this.oEmoji &&
                    b3 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    a2 == this.xEmoji &&
                    a3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    a2 == this.oEmoji &&
                    a3 == this.oEmoji) ||
                  (b1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    b3 == this.xEmoji) ||
                  (b1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    b3 == this.oEmoji) ||
                  (c1 == this.xEmoji &&
                    c2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (c1 == this.oEmoji &&
                    c2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                ) {
                  this.message.channel.send(
                    `Tebrikler! ${gameData[player].member} Sen kazandın.`
                  );
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                } else if (
                  a1 !== "⬜" &&
                  a2 !== "⬜" &&
                  a3 !== "⬜" &&
                  b1 !== "⬜" &&
                  b2 !== "⬜" &&
                  b3 !== "⬜" &&
                  c1 !== "⬜" &&
                  c2 !== "⬜" &&
                  c3 !== "⬜"
                ) {
                  this.message.channel.send(`Oyun berabere bitti`);
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                }
              } catch (e) {
                console.log(e.stack ? e.stack : e);
              }
              player = (player + 1) % 2;
              if (player == 0) {
                Embed = new MessageEmbed()
                  .setDescription(
                    `__**${authorName}**__ VS ${this.opponent.username}`
                  )
                  .setColor(3426654);
              } else {
                Embed = new MessageEmbed()
                  .setDescription(
                    `${authorName} VS __**${this.opponent.username}**__`
                  )
                  .setColor(3426654);
              }
              A2 = new MessageButton()
                .setCustomId(a22)
                .setStyle(`${gameData[player].color}`)
                .setEmoji(gameData[player].em)
                .setDisabled();
            }
          } else if (
            btn.customId == a33 &&
            gameData[player].member.id === btn.user.id
          ) {
            btn.deferUpdate();
            if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
              btn.message.update("O buttona zaten tıklamışlar.");
            } else {
              try {
                a3 = gameData[player].em;
                if (
                  (a1 == this.xEmoji &&
                    b1 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b1 == this.oEmoji &&
                    c1 == this.oEmoji) ||
                  (a2 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c2 == this.xEmoji) ||
                  (a2 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c2 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b3 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a3 == this.oEmoji &&
                    b3 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    a2 == this.xEmoji &&
                    a3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    a2 == this.oEmoji &&
                    a3 == this.oEmoji) ||
                  (b1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    b3 == this.xEmoji) ||
                  (b1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    b3 == this.oEmoji) ||
                  (c1 == this.xEmoji &&
                    c2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (c1 == this.oEmoji &&
                    c2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                ) {
                  this.message.channel.send(
                    `Tebrikler! ${gameData[player].member} Sen kazandın.`
                  );
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                } else if (
                  a1 !== "⬜" &&
                  a2 !== "⬜" &&
                  a3 !== "⬜" &&
                  b1 !== "⬜" &&
                  b2 !== "⬜" &&
                  b3 !== "⬜" &&
                  c1 !== "⬜" &&
                  c2 !== "⬜" &&
                  c3 !== "⬜"
                ) {
                  this.message.channel.send(`Oyun berabere bitti`);
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                }
              } catch (e) {
                console.log(e.stack ? e.stack : e);
              }
              player = (player + 1) % 2;
              if (player == 0) {
                Embed = new MessageEmbed()
                  .setDescription(
                    `__**${authorName}**__ VS ${this.opponent.username}`
                  )
                  .setColor(3426654);
              } else {
                Embed = new MessageEmbed()
                  .setDescription(
                    `${authorName} VS __**${this.opponent.username}**__`
                  )
                  .setColor(3426654);
              }
              A3 = new MessageButton()
                .setCustomId(a33)
                .setStyle(`${gameData[player].color}`)
                .setEmoji(gameData[player].em)
                .setDisabled();
            }
          } else if (
            btn.customId == b11 &&
            gameData[player].member.id === btn.user.id
          ) {
            btn.deferUpdate();
            if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
              btn.message.update("O buttona zaten tıklamışlar.");
            } else {
              try {
                b1 = gameData[player].em;
                if (
                  (a1 == this.xEmoji &&
                    b1 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b1 == this.oEmoji &&
                    c1 == this.oEmoji) ||
                  (a2 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c2 == this.xEmoji) ||
                  (a2 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c2 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b3 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a3 == this.oEmoji &&
                    b3 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    a2 == this.xEmoji &&
                    a3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    a2 == this.oEmoji &&
                    a3 == this.oEmoji) ||
                  (b1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    b3 == this.xEmoji) ||
                  (b1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    b3 == this.oEmoji) ||
                  (c1 == this.xEmoji &&
                    c2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (c1 == this.oEmoji &&
                    c2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                ) {
                  this.message.channel.send(
                    `Tebrikler! ${gameData[player].member} Sen kazandın.`
                  );
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                } else if (
                  a1 !== "⬜" &&
                  a2 !== "⬜" &&
                  a3 !== "⬜" &&
                  b1 !== "⬜" &&
                  b2 !== "⬜" &&
                  b3 !== "⬜" &&
                  c1 !== "⬜" &&
                  c2 !== "⬜" &&
                  c3 !== "⬜"
                ) {
                  this.message.channel.send(`Oyun berabere bitti`);
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                }
              } catch (e) {
                console.log(e.stack ? e.stack : e);
              }
              player = (player + 1) % 2;
              if (player == 0) {
                Embed = new MessageEmbed()
                  .setDescription(
                    `__**${authorName}**__ VS ${this.opponent.username}`
                  )
                  .setColor(3426654);
              } else {
                Embed = new MessageEmbed()
                  .setDescription(
                    `${authorName} VS __**${this.opponent.username}**__`
                  )
                  .setColor(3426654);
              }
              B1 = new MessageButton()
                .setCustomId(b11)
                .setStyle(`${gameData[player].color}`)
                .setEmoji(gameData[player].em)
                .setDisabled();
            }
          } else if (
            btn.customId == b22 &&
            gameData[player].member.id === btn.user.id
          ) {
            btn.deferUpdate();
            if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
              btn.message.update("O buttona zaten tıklamışlar.");
            } else {
              try {
                b2 = gameData[player].em;
                if (
                  (a1 == this.xEmoji &&
                    b1 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b1 == this.oEmoji &&
                    c1 == this.oEmoji) ||
                  (a2 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c2 == this.xEmoji) ||
                  (a2 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c2 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b3 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a3 == this.oEmoji &&
                    b3 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    a2 == this.xEmoji &&
                    a3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    a2 == this.oEmoji &&
                    a3 == this.oEmoji) ||
                  (b1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    b3 == this.xEmoji) ||
                  (b1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    b3 == this.oEmoji) ||
                  (c1 == this.xEmoji &&
                    c2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (c1 == this.oEmoji &&
                    c2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                ) {
                  this.message.channel.send(
                    `Tebrikler! ${gameData[player].member} Sen kazandın.`
                  );
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                } else if (
                  a1 !== "⬜" &&
                  a2 !== "⬜" &&
                  a3 !== "⬜" &&
                  b1 !== "⬜" &&
                  b2 !== "⬜" &&
                  b3 !== "⬜" &&
                  c1 !== "⬜" &&
                  c2 !== "⬜" &&
                  c3 !== "⬜"
                ) {
                  this.message.channel.send(`Oyun berabere bitti`);
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                }
              } catch (e) {
                console.log(e.stack ? e.stack : e);
              }
              player = (player + 1) % 2;
              if (player == 0) {
                Embed = new MessageEmbed()
                  .setDescription(
                    `__**${authorName}**__ VS ${this.opponent.username}`
                  )
                  .setColor(3426654);
              } else {
                Embed = new MessageEmbed()
                  .setDescription(
                    `${authorName} VS __**${this.opponent.username}**__`
                  )
                  .setColor(3426654);
              }
              B2 = new MessageButton()
                .setCustomId(b22)
                .setStyle(`${gameData[player].color}`)
                .setEmoji(gameData[player].em)
                .setDisabled();
            }
          } else if (
            btn.customId == b33 &&
            gameData[player].member.id === btn.user.id
          ) {
            btn.deferUpdate();
            if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
              btn.message.update("O buttona zaten tıklamışlar.");
            } else {
              try {
                b3 = gameData[player].em;
                if (
                  (a1 == this.xEmoji &&
                    b1 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b1 == this.oEmoji &&
                    c1 == this.oEmoji) ||
                  (a2 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c2 == this.xEmoji) ||
                  (a2 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c2 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b3 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a3 == this.oEmoji &&
                    b3 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    a2 == this.xEmoji &&
                    a3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    a2 == this.oEmoji &&
                    a3 == this.oEmoji) ||
                  (b1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    b3 == this.xEmoji) ||
                  (b1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    b3 == this.oEmoji) ||
                  (c1 == this.xEmoji &&
                    c2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (c1 == this.oEmoji &&
                    c2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                ) {
                  this.message.channel.send(
                    `Tebrikler! ${gameData[player].member} Sen kazandın.`
                  );
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                } else if (
                  a1 !== "⬜" &&
                  a2 !== "⬜" &&
                  a3 !== "⬜" &&
                  b1 !== "⬜" &&
                  b2 !== "⬜" &&
                  b3 !== "⬜" &&
                  c1 !== "⬜" &&
                  c2 !== "⬜" &&
                  c3 !== "⬜"
                ) {
                  this.message.channel.send(`Oyun berabere bitti`);
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                }
              } catch (e) {
                console.log(e.stack ? e.stack : e);
              }
              player = (player + 1) % 2;
              if (player == 0) {
                Embed = new MessageEmbed()
                  .setDescription(
                    `__**${authorName}**__ VS ${this.opponent.username}`
                  )
                  .setColor(3426654);
              } else {
                Embed = new MessageEmbed()
                  .setDescription(
                    `${authorName} VS __**${this.opponent.username}**__`
                  )
                  .setColor(3426654);
              }
              B3 = new MessageButton()
                .setCustomId(b33)
                .setStyle(`${gameData[player].color}`)
                .setEmoji(gameData[player].em)
                .setDisabled();
            }
          } else if (
            btn.customId == c11 &&
            gameData[player].member.id === btn.user.id
          ) {
            btn.deferUpdate();
            if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
              btn.message.update("O buttona zaten tıklamışlar.");
            } else {
              try {
                c1 = gameData[player].em;
                if (
                  (a1 == this.xEmoji &&
                    b1 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b1 == this.oEmoji &&
                    c1 == this.oEmoji) ||
                  (a2 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c2 == this.xEmoji) ||
                  (a2 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c2 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b3 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a3 == this.oEmoji &&
                    b3 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    a2 == this.xEmoji &&
                    a3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    a2 == this.oEmoji &&
                    a3 == this.oEmoji) ||
                  (b1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    b3 == this.xEmoji) ||
                  (b1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    b3 == this.oEmoji) ||
                  (c1 == this.xEmoji &&
                    c2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (c1 == this.oEmoji &&
                    c2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                ) {
                  this.message.channel.send(
                    `Tebrikler! ${gameData[player].member} Sen kazandın.`
                  );
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                } else if (
                  a1 !== "⬜" &&
                  a2 !== "⬜" &&
                  a3 !== "⬜" &&
                  b1 !== "⬜" &&
                  b2 !== "⬜" &&
                  b3 !== "⬜" &&
                  c1 !== "⬜" &&
                  c2 !== "⬜" &&
                  c3 !== "⬜"
                ) {
                  this.message.channel.send(`Oyun berabere bitti`);
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                }
              } catch (e) {
                console.log(e.stack ? e.stack : e);
              }
              player = (player + 1) % 2;
              if (player == 0) {
                Embed = new MessageEmbed()
                  .setDescription(
                    `__**${authorName}**__ VS ${this.opponent.username}`
                  )
                  .setColor(3426654);
              } else {
                Embed = new MessageEmbed()
                  .setDescription(
                    `${authorName} VS __**${this.opponent.username}**__`
                  )
                  .setColor(3426654);
              }
              C1 = new MessageButton()
                .setCustomId(c11)
                .setStyle(`${gameData[player].color}`)
                .setEmoji(gameData[player].em)
                .setDisabled();
            }
          } else if (
            btn.customId == c22 &&
            gameData[player].member.id === btn.user.id
          ) {
            btn.deferUpdate();
            if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
              btn.message.update("O buttona zaten tıklamışlar.");
            } else {
              try {
                c2 = gameData[player].em;
                if (
                  (a1 == this.xEmoji &&
                    b1 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b1 == this.oEmoji &&
                    c1 == this.oEmoji) ||
                  (a2 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c2 == this.xEmoji) ||
                  (a2 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c2 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b3 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a3 == this.oEmoji &&
                    b3 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    a2 == this.xEmoji &&
                    a3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    a2 == this.oEmoji &&
                    a3 == this.oEmoji) ||
                  (b1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    b3 == this.xEmoji) ||
                  (b1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    b3 == this.oEmoji) ||
                  (c1 == this.xEmoji &&
                    c2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (c1 == this.oEmoji &&
                    c2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                ) {
                  this.message.channel.send(
                    `Tebrikler! ${gameData[player].member} Sen kazandın.`
                  );
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                } else if (
                  a1 !== "⬜" &&
                  a2 !== "⬜" &&
                  a3 !== "⬜" &&
                  b1 !== "⬜" &&
                  b2 !== "⬜" &&
                  b3 !== "⬜" &&
                  c1 !== "⬜" &&
                  c2 !== "⬜" &&
                  c3 !== "⬜"
                ) {
                  this.message.channel.send(`Oyun berabere bitti`);
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                }
              } catch (e) {
                console.log(e.stack ? e.stack : e);
              }
              player = (player + 1) % 2;
              if (player == 0) {
                Embed = new MessageEmbed()
                  .setDescription(
                    `__**${authorName}**__ VS ${this.opponent.username}`
                  )
                  .setColor(3426654);
              } else {
                Embed = new MessageEmbed()
                  .setDescription(
                    `${authorName} VS __**${this.opponent.username}**__`
                  )
                  .setColor(3426654);
              }
              C2 = new MessageButton()
                .setCustomId(c22)
                .setStyle(`${gameData[player].color}`)
                .setEmoji(gameData[player].em)
                .setDisabled();
            }
          } else if (
            btn.customId == c33 &&
            gameData[player].member.id === btn.user.id
          ) {
            btn.deferUpdate();
            if (btn.label == this.oEmoji || btn.label == this.xEmoji) {
              btn.message.update("O buttona zaten tıklamışlar.");
            } else {
              try {
                c3 = gameData[player].em;
                if (
                  (a1 == this.xEmoji &&
                    b1 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b1 == this.oEmoji &&
                    c1 == this.oEmoji) ||
                  (a2 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c2 == this.xEmoji) ||
                  (a2 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c2 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b3 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a3 == this.oEmoji &&
                    b3 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    a2 == this.xEmoji &&
                    a3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    a2 == this.oEmoji &&
                    a3 == this.oEmoji) ||
                  (b1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    b3 == this.xEmoji) ||
                  (b1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    b3 == this.oEmoji) ||
                  (c1 == this.xEmoji &&
                    c2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (c1 == this.oEmoji &&
                    c2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a1 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c3 == this.xEmoji) ||
                  (a1 == this.oEmoji &&
                    b2 == this.oEmoji &&
                    c3 == this.oEmoji) ||
                  (a3 == this.xEmoji &&
                    b2 == this.xEmoji &&
                    c1 == this.xEmoji) ||
                  (a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                ) {
                  this.message.channel.send(
                    `Tebrikler! ${gameData[player].member} Sen kazandın.`
                  );
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                } else if (
                  a1 !== "⬜" &&
                  a2 !== "⬜" &&
                  a3 !== "⬜" &&
                  b1 !== "⬜" &&
                  b2 !== "⬜" &&
                  b3 !== "⬜" &&
                  c1 !== "⬜" &&
                  c2 !== "⬜" &&
                  c3 !== "⬜"
                ) {
                  this.message.channel.send(`Oyun berabere bitti`);
                  gameCollector.stop();
                  midDuel.delete(author);
                  midDuel.delete(member.id);
                }
              } catch (e) {
                console.log(e.stack ? e.stack : e);
              }
              player = (player + 1) % 2;
              if (player == 0) {
                Embed = new MessageEmbed()
                  .setDescription(
                    `__**${authorName}**__ VS ${this.opponent.username}`
                  )
                  .setColor(3426654);
              } else {
                Embed = new MessageEmbed()
                  .setDescription(
                    `${authorName} VS __**${this.opponent.username}**__`
                  )
                  .setColor(3426654);
              }
              C3 = new MessageButton()
                .setCustomId(c33)
                .setStyle(`${gameData[player].color}`)
                .setEmoji(gameData[player].em)
                .setDisabled();
            }
          } else {
            return btn.reply({
              content: "Lütfen rakibinizi bekleyin.",
              ephemeral: true,
            });
          }
          msg.edit({
            embeds: [Embed],
            components: [
              new MessageActionRow().addComponents([A1, A2, A3]),
              new MessageActionRow().addComponents([B1, B2, B3]),
              new MessageActionRow().addComponents([C1, C2, C3]),
            ],
          });
        });

        gameCollector.on("end", async (btn) => {
          msg
            .edit({
              embeds: [Embed],
              components: [
                new MessageActionRow().addComponents([
                  A1.setDisabled(),
                  A2.setDisabled(),
                  A3.setDisabled(),
                ]),
                new MessageActionRow().addComponents([
                  B1.setDisabled(),
                  B2.setDisabled(),
                  B3.setDisabled(),
                ]),
                new MessageActionRow().addComponents([
                  C1.setDisabled(),
                  C2.setDisabled(),
                  C3.setDisabled(),
                ]),
              ],
            })
            .catch(() => {});
        });
      });

    function getBoarder() {
      return ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜", "⬜"];
    }

    function getIds() {
      return [
        "A1-1",
        "A2-2",
        "A3-3",
        "B1-1",
        "B2-2",
        "B3-3",
        "C1-1",
        "C2-2",
        "C3-3",
      ];
    }

    function getButtons() {
      return [
        new MessageButton()
          .setCustomId(a11)
          .setStyle("SECONDARY")
          .setLabel("1"),
        new MessageButton()
          .setCustomId(a22)
          .setStyle("SECONDARY")
          .setLabel("2"),
        new MessageButton()
          .setCustomId(a33)
          .setStyle("SECONDARY")
          .setLabel("3"),
        new MessageButton()
          .setCustomId(b11)
          .setStyle("SECONDARY")
          .setLabel("4"),
        new MessageButton()
          .setCustomId(b22)
          .setStyle("SECONDARY")
          .setLabel("5"),
        new MessageButton()
          .setCustomId(b33)
          .setStyle("SECONDARY")
          .setLabel("6"),
        new MessageButton()
          .setCustomId(c11)
          .setStyle("SECONDARY")
          .setLabel("7"),
        new MessageButton()
          .setCustomId(c22)
          .setStyle("SECONDARY")
          .setLabel("8"),
        new MessageButton()
          .setCustomId(c33)
          .setStyle("SECONDARY")
          .setLabel("9"),
      ];
    }
  }
}
exports.execute = async (client, message, args) => {
  const config = require("../config")
  var prefix = config.prefix;
    const embedssz = new MessageEmbed()
      .setDescription("Kullanıcıyı düzgünce belirt.")
      .setAuthor(
        message.author.username,
        message.author.avatarURL({ dynamic: true })
      )
      .setColor("RED");
    const memberCache = message.mentions.users.first();
    if (!memberCache)
      return message.channel.send({
        embeds: [embedssz],
      });
    new TicTacToe({
      message: message,
      opponent: memberCache,
      xrenk: "DANGER",
      orenk: "SUCCESS",
      xEmoji: "❌",
      oEmoji: "⭕",
    }).start();
    return;
  },
exports.conf = {
  command: "xox",
  description: "",
  aliases: []
}
