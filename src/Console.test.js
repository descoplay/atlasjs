describe('Console', () => {
    const Imports = require('./Imports')

    test('Se log() com clear: true esta chamando a limeza de tela', () => {
        const Console = getModule()

        let run = false

        global.Atlas = { config: {}, Imports, }

        Imports.define('clear', () => run = true)
        Imports.defineConsole('log', () => {})

        Console.log('', { clear: true, })

        expect(run).toEqual(true)
    })

    test('Se log() esta imprimindo a mensagem desejada', () => {
        const Console = getModule()

        let msg = ''

        global.Atlas = { config: {}, Imports, }

        Imports.defineConsole('log', _txt => msg = _txt)

        Console.log('escreveu')

        expect(msg).toEqual('escreveu')
    })

    test('Se log() com breakLine: true esta quebrando linha', () => {
        const Console = getModule()

        const msg = []

        global.Atlas = { config: {}, Imports, }

        Imports.defineConsole('log', _txt => msg.push(_txt))

        Console.log('-', { breakLine: true, })

        expect(msg[1]).toEqual('')
    })

    test('Se hader() escreve corretamente o cabeçalho', () => {
        const Console = getModule()

        const msg = []
        let run = false

        global.Atlas = { config: {}, Imports, }

        Imports.define('clear', () => run = true)
        Imports.defineConsole('log', _txt => msg.push(_txt))

        Console.header()

        expect(msg[0]).toEqual('<--- Atlas v2.0.0 -->')
        expect(msg[1]).toEqual('')
        expect(run).toEqual(true)
    })

    function getModule () {
        delete global.Atlas

        Imports.undefineAll()

        return require('./Console')
    }
})