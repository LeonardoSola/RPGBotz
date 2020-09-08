const Discord = require('discord.js');
const client = new Discord.Client();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)


const config = require('./config.json')
const prefixo = config.prefix

client.on("guildCreate", (guild) => {
    db.set(guild.id, []).write()
    console.log(`entrei em um novo servidor: ${guild.name} (id: ${guild.id})`)
})

// Comandos amarzenados num objeto
const comandos = {
    rolar(argumento, autor) {
        var args = argumento.split('d')
        if (!Number(args[1])) return
        if (argumento[0] == '0') {
            return `Use um valor diferente de 0`
        }
        if (args[0] == '') {
            var res = getRandom(args[1])
            return `<@!${autor.id}> o resultado foi: ${res}`
        } else if (Number(args[0])) {
            var res = new Array
            let c = 0
            while (c < args[0]) {
                let resultados = getRandom(args[1])
                res.push(resultados)
                c++
            }
            var total = res.reduce((prev, cur) => {
                return prev + cur
            })
            return `<@!${autor.id}> o resultado foi: \`${res}\` total: \`${total}\``
        } else return
    },
    ficha(argumento, autor, message, mencao, perfil) {
        if (argumento == '') {
            return `${fichaInteira(perfil)}`
        } else {
            if (!mencao) {
                return 'Perfil não encontrado (houve um erro no seu comando)'
                return
            }
            var perfilMencao = db.get(message.guild.id).find({ id: mencao.user.id }).value()
            return `${fichaInteira(perfilMencao)}`
        }
    },
    vida(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.vida)
        if (argumento == '') {
            return `Sua vida: ${perfil.vida}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ vida: n }).write()
            return `Sua vida agora é: ${n}!`
        }
        if (args[1] == '') { return 'Seja claro com o que você quer!' }
        if (!Number(args[1])) { return 'Coloque um numero da proxima vez!' }
        if (args[0] == "+") {
            let n = vPrev + Number(args[1])
            if (n >= perfil.vidaMaxima) {
                db.get(message.guild.id).find({ id: autor.id }).assign({ vida: perfil.vidaMaxima }).write()
                return `Você tinha ${vPrev}, ganhou ${args[1]} porem sua vida maxima é ${perfil.vidaMaxima} entao ficara com ${perfil.vidaMaxima}!`
            }
            db.get(message.guild.id).find({ id: autor.id }).assign({ vida: n }).write()
            return `Você tinha ${vPrev}, ganhou ${args[1]} e agora esta com ${n}!!`
        }
        if (args[0] == "-") {
            let n = vPrev - Number(args[1])
            db.get(message.guild.id).find({ id: autor.id }).assign({ vida: n }).write()
            return `Você tinha ${vPrev}, perdeu ${args[1]} e agora esta com ${n}!`
        }
    },
    ouro(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.ouro)
        if (argumento == '') {
            return `Seu ouro: ${perfil.ouro}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ ouro: n }).write()
            return `Seu ouro agora é: ${n}!`
        }
        if (args[1] == '') { return 'Seja claro com o que você quer!' }
        if (!Number(args[1])) { return 'Coloque um numero da proxima vez!' }
        if (args[0] == "+") {
            let n = vPrev + Number(args[1])
            db.get(message.guild.id).find({ id: autor.id }).assign({ ouro: n }).write()
            return `Você tinha ${vPrev}, ganhou ${args[1]} e agora esta com ${n}!`
        }
        if (args[0] == "-") {
            let n = vPrev - Number(args[1])
            db.get(message.guild.id).find({ id: autor.id }).assign({ ouro: n }).write()
            return `Você tinha ${vPrev}, perdeu ${args[1]} e agora esta com ${n}!`
        }
    },
    vidamax(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.vidaMaxima)
        if (argumento == '') {
            return `Sua vida maxima: ${perfil.vidaMaxima}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ vidaMaxima: n }).write()
            return `Sua vidaMaxima agora é: ${n}!`
        }
    },
    habilidade(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.habilidade)
        if (argumento == '') {
            return `Sua habilidade: ${perfil.habilidade}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ habilidade: n }).write()
            return `Sua habilidade agora é: ${n}!`
        }
    },
    forca(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.forca)
        if (argumento == '') {
            return `Sua força: ${perfil.forca}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ forca: n }).write()
            return `Sua força agora é: ${n}!`
        }
    },
    destreza(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.destreza)
        if (argumento == '') {
            return `Sua destreza: ${perfil.destreza}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ destreza: n }).write()
            return `Sua destreza agora é: ${n}!`
        }
    },
    inteligencia(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.inteligencia)
        if (argumento == '') {
            return `Sua inteligencia: ${perfil.inteligencia}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ inteligencia: n }).write()
            return `Sua inteligencia agora é: ${n}!`
        }
    },
    percepcao(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.percepcao)
        if (argumento == '') {
            return `Sua percepçao: ${perfil.percepcao}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ percepcao: n }).write()
            return `Sua percepcço agora é: ${n}!`
        }
    },
    carisma(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.carisma)
        if (argumento == '') {
            return `Seu carisma: ${perfil.carisma}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ carisma: n }).write()
            return `Seu carisma agora é: ${n}!`
        }
    },
    itens(argumento, autor, message, mencao, perfil) {
        var args = argumento.split(' ')
        if (argumento == '') {
            return `Seus itens:
${mostrarItens(perfil)}`
        }
        var prevItens = perfil.itens
        if (args[1] == '') { return 'Coloque o nome do item' }
        if (args[0] == "+") {
            var newItens = new Array
            newItens = prevItens
            var novoItem = argumento.slice(2)
            newItens.push(novoItem)
            db.get(message.guild.id).find({ id: autor.id }).assign({ itens: newItens }).write()
            return `${novoItem} foi adicionado aos seus itens!`
        }
        if (args[0] == "-") {
            if (!Number(args[1])) { return 'Coloque o numero do item que quer retirar' }
            var newItens = new Array
            newItens = prevItens
            let pos = args[1] - 1
            let removed = newItens.splice(pos, 1)
            db.get(message.guild.id).find({ id: autor.id }).assign({ itens: newItens }).write()
            return `${removed} foi retirado dos seus itens!`
        }
        if (Number(args[0]) != NaN) {
            if (!Number(args[1]) && Number(args[1]) != 0) { return 'Coloque o numero do item que quer colocar quantidade' }

            var newItens = new Array
            var newQuants = new Array
            let quant = new Array
            let numeroAM = 0

            newQuants = prevItens[Number(args[0]) - 1]

            let reg1 = /\(/g
            let reg2 = /\)/g
            if (!reg1.test(newQuants) && !reg2.test(newQuants)) {
                newQuants = newQuants + '(00)'
                numeroAM = 4
            }

            newItens = prevItens
            quant = newQuants

            quant = quant.split('(')
            quant = quant[1].split(')')
            quant = quant[0]
            
            let numb = -2 - quant.length

            
            console.log(Number(args[1]))
            if (Number(args[1]) == 0) {
                console.log('é Zer0')
                prevItens[Number(args[0]) - 1] = `${newQuants.slice(0, numb).trim()}`
                db.get(message.guild.id).find({ id: autor.id }).assign({ itens: prevItens }).write()
                return `agora ${newQuants.slice(0, numb).trim()} não tem unidades`
            }
            
            prevItens[Number(args[0]) - 1] = `${newQuants.slice(0, numb).trim()} \(${Number(args[1])}\)`
            db.get(message.guild.id).find({ id: autor.id }).assign({ itens: prevItens }).write()

            return `agora ${newQuants.slice(0, numb).trim()} tem ${Number(args[1])} unidades`
        }
    },
    apagarperfil(argumento, autor, message, mencao, perfil) {
        if (perfil == undefined) {
            return 'Você não possui um perfil'
        }
        db.get(message.guild.id).remove({ id: autor.id }).write()
        return 'Sua ficha foi resetada!'
    },
    nome(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.nome)
        if (argumento == '') {
            return `Seu nome é: ${perfil.nome}`
        }
        if (argumento.length > 30) {
            return `O nome que voce tentou colocar tem ${argumento.length} caracteres. O limite é 30!`
        }
        let n = argumento
        db.get(message.guild.id).find({ id: autor.id }).assign({ nome: n }).write()
        return `Seu nome agora é: ${n}!`
    },
    provisoes(argumento, autor, message, mencao, perfil) {
        var vPrev = Number(perfil.provisoes)
        if (argumento == '') {
            return `Suas provisões: ${perfil.provisoes}`
        }
        var args = argumento.split(' ')
        if (Number(args[0])) {
            let n = args[0]
            db.get(message.guild.id).find({ id: autor.id }).assign({ provisoes: n }).write()
            return `Suas provisões agora é: ${n}!`
        }
        if (args[1] == '') { return 'Seja claro com o que você quer!' }
        if (!Number(args[1])) { return 'Coloque um numero da proxima vez!' }
        if (args[0] == "+") {
            let n = vPrev + Number(args[1])
            db.get(message.guild.id).find({ id: autor.id }).assign({ provisoes: n }).write()
            return `Você tinha ${vPrev}, ganhou ${args[1]} e agora esta com ${n}!`
        }
        if (args[0] == "-") {
            let n = vPrev - Number(args[1])
            db.get(message.guild.id).find({ id: autor.id }).assign({ provisoes: n }).write()
            return `Você tinha ${vPrev}, perdeu ${args[1]} e agora esta com ${n}!`
        }
    },
    ping(argumento, autor, message, mencao, perfil) {
        pingz(argumento, autor, message, mencao, perfil)
    },
    help(argumento, autor, message, mencao, perfil) {
        var args = argumento.split(' ')
        if (argumento == '') {
            return `Digite $help (nome do comando) pra saber o que o comando faz.
Comandos:
\`[rolar, ficha, vida, ouro, vidamax, habilidade, forca, destreza, inteligencia, percepcao, carisma, ping, itens, nome, apagarperfil, help]\`
            `
        }
        let comando1 = args[0]
        if (!helpComandos[comando1]) return

        var justDoIt = helpComandos[comando1]
        var res = justDoIt()

        if (!res) {
            return 'Este comando não existe!'
        }
        return res
    },
}
// Função pra pegar numero aleatorio
function getRandom(x) {
    return Math.floor(Math.random() * (x - 1) + 1)
}

client.once('ready', () => {
    console.log('Pronto!');
    client.user.setActivity(`Digite: $help`, { type: "LISTENING" })
});

client.login(config.token);

client.on('message', message => {

    if (message.author.bot) return

    const args = message.content.slice(prefixo.length).trim().split(/ +/g)
    const comando = args.shift().toLowerCase()
    const argumento = message.content.slice(comando.length + prefixo.length + 1)
    const autor = message.author
    const mencao = message.mentions.members.first()
    var perfil = db.get(message.guild.id).find({ id: autor.id }).value()

    if (perfil == undefined) {
        novoPerfil(argumento, autor, message, mencao, perfil)
    }

    if (!message.content.startsWith(prefixo)) return
    if (!comandos[comando]) return

    var fazer = comandos[comando]
    var res = fazer(argumento, autor, message, mencao, perfil)

    if (!res) return
    message.channel.send(res)
});

function fichaInteira(perfil) {
    if (perfil == undefined) {
        return 'Perfil não encontrado'
    }
    return `
    > Nome: ${perfil.nome}
    > Vida: ${perfil.vida}/${perfil.vidaMaxima}
    > Habilidade: ${perfil.habilidade}
    > Ouro: ${perfil.ouro}
    > __________________
    > Força: ${perfil.forca}
    > Destreza: ${perfil.destreza}
    > Inteligência: ${perfil.inteligencia}
    > Percepção: ${perfil.percepcao}
    > Carisma: ${perfil.carisma}
    > ___________________
    > Itens: 
${mostrarItens(perfil)}
    `
}
function mostrarItens(perfil) {
    var itens = perfil.itens
    var res = ''
    var n = 1
    itens.forEach(element => {
        res += `> [${n}]${element},
`
        n++
    });
    return res
}
function novoPerfil(argumento, autor, message, mencao, perfil) {
    db.get(message.guild.id)
        .push({
            id: autor.id,
            nome: autor.username,
            avatar: autor.avatar,
            habilidade: 0,
            vida: 0,
            vidaMaxima: 0,
            ouro: 0,
            forca: 0,
            destreza: 0,
            inteligencia: 0,
            percepcao: 0,
            carisma: 0,
            itens: [],
            historico: [],
        }).write()
}
const helpComandos = {
    rolar() { return "Escreva $rolar (numero de dados)d(numerdo de lados do dado). Exemplo: $rolar 2d20" },
    ficha() { return "Escreva $ficha pra mostrar sua ficha ou escreva $ficha @nomedapessoa pra mostrar a ficha da pessoa. Exemplo: $ficha @Leonardo" },
    vida() { return "Escreva $vida pra mostrar sua vida, escreva $vida (numero pra definir sua vida) ou escreva $vida + (numero) para adicionar vida (ou use '-' pra retirar). Exemplo: $vida - 8" },
    ouro() { return "Escreva $ouro pra mostrar seu ouro, escreva $ouro (numero pra definir seu ouro) ou escreva $ouro + (numero) para adicionar ouro (ou use '-' pra retirar). Exemplo: $ouro - 8" },
    vidamax() { return "Escreva $vidamax (numero de vida maxima). Exemplo: $vidamax 30" },
    habilidade() { return "Escreva $habilidade (numero da habilidade). Exemplo: $habilidade 11" },
    forca() { return "Escreva $forca (numero da força). Exemplo: $forca 11" },
    destreza() { return "Escreva $destreza (numero da destreza). Exemplo: $destreza 11" },
    inteligencia() { return "Escreva $inteligencia (numero da inteligencia). Exemplo: $inteligencia 11" },
    percepcao() { return "Escreva $percepcao (numero da percepção). Exemplo: $percepcao 11" },
    carisma() { return "Escreva $carisma (numero do carisma). Exemplo: $carisma 11" },
    itens() { return "Escreva $itens pra mostrar seus itens, escreva $itens + (nome do item) ou escreva $itens - (numero do item no iventario). Exemplo: $itens ou $itens - 2 | Quantidade: escreva $itens (numero do item) (quantidade) para colocar quantidade no item, caso a quantidade seja 0 a quantidade é removida. Exemplo: $itens 3 25" },
    nome() { return "Escreva $nome (e o nome desejado) ou nome $nome pra mostrar seu nome. Exemplo: $nome Leonardo" },
    apagarperfil() { return "Escreva $apagarperfil pra apagar seu perfil. CUIDADO!. Exemplo: $apagarperfil" },
    ping() { return "Escreva $ping para ver o ping do bot. Exemplo: $ping" },
    help() { return "Escreva $help (comando) pra mostrar o que o comando faz. Exemplo: $help rolar" }
}

client.on('message', message => {
    if (message.author.id != config.admId) return

    const args = message.content.slice(prefixo.length).trim().split(/ +/g)
    const comando = args.shift().toLowerCase()
    const argumento = message.content.slice(comando.length + prefixo.length + 1)
    const autor = message.author
    const mencao = message.mentions.members.first()
    var perfil = db.get(message.guild.id).find({ id: autor.id }).value()

    if (!message.content.startsWith(prefixo)) return
    if (!admComands[comando]) return

    var executar = admComands[comando]
    var res = executar(argumento, autor, message, mencao, perfil)

    if (!res) return
    message.channel.send(res)
})
const admComands = { // comandos do corno do adm... q sou eu
    avatar(argumento, autor, message, mencao, perfil) {
        var arquivo = `./img/${argumento}`
        client.user.setAvatar(arquivo.replace(' ', ''))
        return `Avatar foi trocado!`
    },
    atividade(argumento) { client.user.setActivity(`${argumento}`, { type: "CUSTOM_STATUS" }) },
    escutando(argumento) { client.user.setActivity(`${argumento}`, { type: "LISTENING" }) },
    jogando(argumento) { client.user.setActivity(`${argumento}`, { type: "PLAYING" }) },
    stream(argumento) { client.user.setActivity(`${argumento}`, { type: "STREAMING" }) },
    assistindo(argumento) { client.user.setActivity(`${argumento}`, { type: "WATCHING" }) },
    nomebot(argumento) { client.user.setUsername(argumento) },
    shutdown() {
        message.channel.send(`Estou me desligando! Até a proxima!`)
        process.exit()
    },
    consolelistener(argumento, autor, message, mencao, perfil) {
        let ligado = db.get("configs").find({ id: "consolelistener" }).value()
        if (ligado.valor == 0) {
            db.get("configs").find({ id: "consolelistener" }).assign({ valor: 1 }).write()
            return `Console listener on!`
        } else if (ligado.valor == 1) {
            db.get("configs").find({ id: "consolelistener" }).assign({ valor: 0 }).write()
            return `Console listener off!`
        }
    },
    escrever(argumento, autor, message, mencao, perfil) {
        console.log(message.channel)
    }
}
async function pingz(argumento, autor, message, mencao, perfil) {
    const m = await message.channel.send("Ping?")
    m.edit(`Pong! A Latencia é ${m.createdTimestamp - message.createdTimestamp}ms.`)
}


client.on('message', message => {
    var ligado = db.get("configs").find({ id: "consolelistener" }).value()
    if (ligado.valor == 0) return
    console.log(`${message.author.username}: ${message.content}`)
})
