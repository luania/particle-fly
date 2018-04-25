export let Colors = {
    white:0xFFFFFF,
    pink:0xffbbbb,
    random:() => Math.round(Math.random() * 0xFFFFFF),
    toHex:(c:any) =>{
      return parseInt("0x" + c.toHexString().substring(1))
    }
}
