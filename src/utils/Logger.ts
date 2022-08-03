export function Log(title: string, message: string, background:string = 'black') {

    const today: Date = new Date();
    const time: string = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let color = '#FFFFFF';
    switch (background) {
        case 'success':
            background = '#078000';
            break
        case 'info':
            //background = '#3F6FFB';
            background = '#EC3262';
            break;
        case 'error':
            background = '#E86C5D';
            break;
        case 'warning':
            background = '#FFD100';
            color = '#000000';
            break;

    }

    console.log(`%c ${time} %c ${title} %c ${message} `, `background: #FFFFFF; color: #000000;`, `background: #000000;`, `background: ${background}; color: ${color};`)

}