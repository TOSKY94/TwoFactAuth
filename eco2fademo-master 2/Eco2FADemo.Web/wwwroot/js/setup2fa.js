$(() => {

    $('#fetchBtn').on('click', (e) => {
        let btn = $(e.currentTarget);
        var username = $('#username').val().trim();
        if (username == '') {
            alert('Username is required');
        } else {
            $.ajax({
                url: 'https://localhost:44345/home/setup2FA',
                method: 'POST',
                data: { username },
                success: (data) => {
                    if (data.success) {
                        //console.log(data.success);
                        $('#qrimg').attr('src', data.url);
                        $('#codesp').html(data.code);

                        $('#qrdiv').slideDown();
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
    });

});
