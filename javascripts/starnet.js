$(function () {
    $('#points').keyup(function () {
        var points = $('#points').val();
        var tenPoints = Math.floor(points / 10);
        var combination = jew(tenPoints);
        if (!combination.coupons.length) {
            combination.coupons = ['no reward available'];
        }
        var result = 'Coupons: ' + combination.coupons.join(', ');
        result += '<br />Rest: ' + (combination.rest * 10 + (points % 10));
        $('#result').html(result);
    });

    $('#rewardForm').submit(function () {
        return false;
    })

    var amounts = [50, 100, 150, 155, 175, 190, 200, 210, 220, 250, 275, 325];

    function jew(amount) {
        var result = {coupons: [], rest: amount}
        if (amount > 1000) {
            result.coupons = ['fatality'];
            return result;
        }
        if (amount < amounts[0]) {
            return result;
        }
        var i = amounts.length - 1;
        for (i; i > -1; i--) {
            if (amount < amounts[i]) {
                continue;
            }
            var newAmount = amount - amounts[i];
            var newResult = jew(newAmount);
            if (result.rest > newResult.rest) {
                result = newResult;
                result.coupons.unshift(amounts[i]);
            }
        }
        return result;
    }
})