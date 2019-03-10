$(function () {
    $('#getProducts').on('click', function () {
        $.ajax({
            url: '/products',
            success: function (products) {
                let tbody = $('tbody')
                tbody.html('');
                products.forEach(product => {
                    tbody.append(`
                        <tr>
                        <td class='id'>${product.id}</td>
                        <td>
                        <input type="text" class="name" value="${product.name}"</td>
                        <td>
                        <button class="update-button"> Update </button>
                        <button class="delete-button"> Delete </button>
                        </td>
                        </tr>
                        `)
                })
            }
        })
    })
    $('#productForm').on('submit', function (e) {
        e.preventDefault()
        let newProduct = $('#newProduct')
        $.ajax({
            url: '/products',
            method: 'post',
            data: {
                name: newProduct.val()
            },
            success: function (response) {
                $('#getProducts').click()
            }
        })
    })
    $('table').on('click', '.update-button', function () {
        let row = $(this).closest('tr')
        let id = row.find('.id').text()
        let name = row.find('.name').val()

        $.ajax({
            url: '/products/' + id,
            method:'PUT',
            data: {
                name:name
            },
            success:function(response){
                console.log(response)
            }
        })
    })
    $('table').on('click','.delete-button', function(){
        let row = $(this).closest('tr') // obtengo toda la fila que seleccione
        let id = row.find('.id').text();
        $.ajax({
            url:'/products/'+id,
            method:'delete',
            success: function(response){
                console.log(response)
                $('#getProducts').click();
            }
        })
    })
})