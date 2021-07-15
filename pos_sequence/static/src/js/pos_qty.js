odoo.define('pos_sequence.pos_qty', function (require) {
"use strict";

    var models = require('point_of_sale.models');
     var screens = require('point_of_sale.screens');
     var core = require('web.core');
//    var orderline_id = 1;
//    var test = 0;
    var QWeb = core.qweb;
    var _t = core._t;



    var _super_Orderline = models.Orderline.prototype;
    models.Orderline = models.Orderline.extend({


    // add the sequence number for order line
         get_sequence: function () {
            var uid = this.uid;
            var order  = this.pos.get_order();
            var orderlines = order.get_orderlines();
//            var order = this.order;
             for(var i = 0, len = orderlines.length; i < len; i++){
                   orderlines[i].sequence = i+1
             }

             return this.sequence

        },


    });

//
        screens.OrderWidget.include({

        remove_orderline: function(order_line){
            this.renderElement();
            this._super(order_line);
    },
//
//         remove_orderline: function(order_line){
//         this._super(order_line);
//          var order = this.pos.get_order();
//          var orderlines = order.get_selected_orderline();
//         var sequence = orderlines.get_sequence();
//
//    },

     renderElement: function(scrollbottom){
             this._super(scrollbottom);
             this.numpad_state.reset();
             var order = this.pos.get_order();
          var orderlines = order.get_selected_orderline();
          if (orderlines){
          var sequence = orderlines.get_sequence();
          }

            },


         });



});
