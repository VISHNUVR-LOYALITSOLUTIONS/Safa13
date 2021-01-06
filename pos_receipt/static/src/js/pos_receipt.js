odoo.define("pos_receipt.pos_receipt", function (require) {
    "use strict";
    var models = require("point_of_sale.models");
    var screens = require('point_of_sale.screens');
    var rpc = require('web.rpc');
    var core = require('web.core');
    var utils = require('web.utils');
    var round_pr = utils.round_precision;

    models.load_fields('res.company', ['street', 'street2', 'city']);
    models.load_fields('res.currency', ['currency_unit_label', 'currency_subunit_label']);

    var _super_order = models.Order.prototype;
    models.Order = models.Order.extend({

//        export_for_printing: function() {
//            var json = _super_order.export_for_printing.apply(this,arguments);
//            json.subtotal_in_words = this.get_amount_in_words();
//            return json;
//        },
        get_amount_in_words: function(num){
            num = round_pr(num, this.pos.currency.rounding)
            var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
            var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

            num = num.toString();
            var parts = num.split(".");
            var integer_value = parts[0];
            if (integer_value.length > 9)
                return 'overflow';
            var fractional_value = 0;
            if (parts.length == 2)
            {
                if (parts[1].length != this.pos.currency.decimals && parts[1].length<this.pos.currency.decimals)
                {
                    for(var i=0; i<(this.pos.currency.decimals-parts[1].length);i++)
                    {
                        parts[1] += '0'
                    }
                }
                fractional_value = parts[1]
            }


            var n = ('000000000' + integer_value).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            if (!n) return;
            var str = '';
            str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
            str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
            str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
            str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
            str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + this.pos.currency.currency_unit_label : '';
            if (fractional_value)
            {
               var n = ('000000000' + fractional_value).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
               if (n)
               {
                    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
                    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
                    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
                    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
                    str += (n[5] != 0) ? ((str != '') ? ' and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + this.pos.currency.currency_subunit_label : '';
               }
            }
            str += ' Only';
            return str;

        },
        get_grouped_tax_details: function(){
            var details = {};
            var fulldetails = [];

            this.orderlines.each(function(line){
                var line_tax_details = line.get_orderline_tax();
                for(var i=0; i< line_tax_details.length;i++){
                    if (line_tax_details[i].id in details)
                    {
                        details[line_tax_details[i].id].taxable +=line_tax_details[i].taxable;
                        details[line_tax_details[i].id].cgst +=line_tax_details[i].cgst;
                        details[line_tax_details[i].id].sgst +=line_tax_details[i].sgst;
                    }
                    else{
                        details[line_tax_details[i].id] ={
                            rate: line_tax_details[i].rate,
                            id : line_tax_details[i].id,
                            taxable: line_tax_details[i].taxable ,
                            cgst: line_tax_details[i].cgst,
                            sgst : line_tax_details[i].sgst,
                        }
                    }
                }
            });

            for(var id in details){
                if(details.hasOwnProperty(id)){
                    fulldetails.push(
                        {
                            rate: details[id].rate,
                            id: details[id].id,
                            taxable: details[id].taxable ,
                            cgst: details[id].cgst,
                            sgst: details[id].sgst,
                        });
                }
            }
            return fulldetails;
        },


    });

    var _super_order_line = models.Orderline.prototype;
    models.Orderline = models.Orderline.extend({
        get_orderline_tax: function() {
            var self = this;
            var taxname = [];
            var product =  this.get_product();
            var taxes_ids = product.taxes_id;
            var taxes =  this.pos.taxes;
            var product_taxes = [];
//            _(taxes_ids).each(function(el){
//                product_taxes.push(_.detect(taxes, function(t){
//                    return t.id === el;
//                }));
//            });
            _(taxes_ids).each(function(el){
                var tax = _.detect(taxes, function(t){
                    return t.id === el;
                });
                product_taxes.push.apply(product_taxes, self._map_tax_fiscal_position(tax));
            });
            product_taxes = _.uniq(product_taxes, function(tax) { return tax.id; });
            _(product_taxes).each(function(tax) {
//                if (self.order.fiscal_position){
//                    tax = self._map_tax_fiscal_position(tax);
//                }
                if (!tax){
                    return;
                }
                var tax_details = self.get_tax_details();
                var kfc = 0;
                var cess = 0;
                var cgst = 0;
                var sgst = 0;
                for(var id in tax_details){
                    if(tax_details.hasOwnProperty(id)){
                        if (self.pos.taxes_by_id[id].name.toLowerCase().includes("kfc"))
                        {
                            kfc += tax_details[id]
                        }
                        if (self.pos.taxes_by_id[id].name.toLowerCase().includes("cgst"))
                        {
                            cgst += tax_details[id]
                        }
                        if (self.pos.taxes_by_id[id].name.toLowerCase().includes("sgst"))
                        {
                            sgst += tax_details[id]
                        }
                        if (self.pos.taxes_by_id[id].name.toLowerCase().includes("cess"))
                        {
                            cess += tax_details[id]
                        }
                    }
                }
                var taxdetail = {
                            name: tax.name,
                            rate: tax.amount,
                            id: tax.id,
                            taxable:self.get_price_without_tax(),
                            kfc : kfc,
                            cgst : cgst,
                            sgst : sgst,
                            cess :cess,
                            gst : sgst+cgst,
                        };
                taxname.push(taxdetail);
            });

            return taxname

        },
    });
});
