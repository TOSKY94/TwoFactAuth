var countDown = 0;
var pin = '';
var lastCode = '';

var timeout, interval = null;

$(() => {

    $('#genBtn').on('click', e => {
        let btn = $(e.currentTarget);

        let code = $('#code').val().trim();
        if (code == '') {
            alert('Code is required!');
        } else {
            try {
                lastCode = code;
                stop();
                start();
            } catch (ex) {
                stop();
                console.log(ex);
                alert(ex.message);
               
            }
        }
    });

});

function gen(code) {
    var totp = new jsOTP.totp();
    var timeCode = totp.getOtp(code);
    return timeCode;
}

function start() {
    $('#pindiv').show();
    $('#pinsp').html(gen(lastCode));
    countDown = getSecondsLeft();
    $('#exp').html(countDown);
    interval = setInterval(() => {
        if (countDown <= 0) {
            clearInterval(interval);
            start();
        } else {
            countDown -= 1;
            $('#exp').html(countDown);
        }
    }, 1000);
    //timeout = setTimeout(() => {

    //}, 30000);
}

function stop() {
    if (interval)
        clearInterval(interval);
    countDown = 0;
    $('#pindiv').hide();
}

function getSecondsLeft() {
    var seconds = (new Date()).getSeconds();
    if (seconds < 30) {
        return 30 - seconds;
    } else {
        return 60 - seconds;
    }
}

