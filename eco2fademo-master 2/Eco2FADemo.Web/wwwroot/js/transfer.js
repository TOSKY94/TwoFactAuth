$(() => {
    $('#completeBtn').on('click', (e) => {
        let username = $('#username').val().trim();
        let debitAccount = $('#debitAccount').val().trim();
        let creditAccount = $('#creditAccount').val().trim();
        let creditBank = $('#creditBank').val().trim();
        let amount = $('#amount').val().trim();
        let pin = $('#pin').val().trim();
        let token = $('#token').val().trim();

        if (username == '' || debitAccount == '' || creditAccount == ''
            || creditBank == '' || amount == '' || pin == '') {
            alert('All fields are required!');
        } else if (pin != '1234') {
            alert('Invalid pin!');
        } else {
            let _amount = parseFloat(amount);
            if (_amount <= 20000) {
                success();
            } else {
                if (token == '') {
                    alert('token is required for this trasaction!');
                } else {
                    $.ajax({
                        url: 'https://localhost:44345/home/validate',
                        method: 'POST',
                        data: { username, token },
                        success: (data) => {
                            if (data.success) {
                                success();
                            } else {
                                alert(data.message);
                            }
                        },
                        error: (jqXHR, status) => {
                            console.error(jqXHR);
                            console.error(status);
                        }
                    });
                }
            }
            
        }

    });

    $('#amount').on('keyup', (e) => {
        var val = $(e.currentTarget).val();
        if (val.trim() != '' && parseFloat(val.trim())) {
            var amount = parseFloat(val.trim());
            if (amount > 20000) {
                $('#tokendiv').show();
            } else {
                $('#tokendiv').hide();
            }
        } else {
            $('#amount').val('');
        }
    });
});

function success() {
    $('#transferdiv').hide();
    $('#successdiv').show();
}