odoo.define('pos_item_count.pos_qty', function (require) {
"use strict";
    var models = require('point_of_sale.models');
     var module = require('point_of_sale.models');
     var screens = require('point_of_sale.screens');
     var core = require('web.core');
    var SuperOrder = models.Order.prototype;
    var SuperOrderline = models.Orderline.prototype;



    //  return the total quantity for the order module
    module.Order = module.Order.extend( {
        getTotalQuantity: function() {

        var order = this.pos.get_order();
    	    var orderlines = order.get_selected_orderline();
            return (this.orderlines).reduce((function(sum, orderLine) {
                return sum + orderLine.get_quantity();
            }), 0);
        },
    });

//    module.OrderWidget = module.OrderWidget.extend({
    screens.OrderWidget.include({

            get_item_count: function(){
            var count=0, current_order = this.get_order();
            _.each(current_order.get_orderlines(), function(orderline){
                count+=orderline.quantity;
            });

            current_order.item_count = count;
            return count
        },



        update_summary: function(){
            this._super();
            var order = this.pos.get_order();
            if (!order.get_orderlines().length) {
            return;
            }
            var quantity  = order ? order.getTotalQuantity() : 0;
            // set the total quantity when the summary is updated
            this.el.querySelector('.summary .total .quantity').textContent = quantity;


        },
    });

});