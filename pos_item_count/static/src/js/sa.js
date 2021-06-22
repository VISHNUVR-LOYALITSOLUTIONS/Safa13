odoo.define('pos_item_count.pos_qty', function (require) {
"use strict";
    var models = require('point_of_sale.models');
    var SuperOrder = models.Order.prototype;
    var SuperOrderline = models.Orderline.prototype;
   var core = require('web.core');
    var qweb = core.qweb;
    var orderline_id = 1;
    var test = 0;
    var screens = require("point_of_sale.screens");


    models.PosModel = models.PosModel.extend({
        get_item_count: function(){
            var count=0, current_order = this.get_order();
            _.each(current_order.get_orderlines(), function(orderline){
                count+=orderline.quantity;
            });

            current_order.item_count = count;
            return count
        },
        change_css: function(){
            var current_order = this.get_order();
            current_order.item_count = this.get_item_count();
            $('#item_qty').text("Total Qty: "+current_order.item_count);
        }
    });

    models.Order = models.Order.extend({
        initialize: function(attributes,options){
            this.item_count = 0;
            SuperOrder.initialize.call(this,attributes,options);
        },
        getTotalQuantity: function() {
            return (this.get('orderLines')).reduce((function(sum, orderLine) {
                return sum + orderLine.get_quantity();
            }), 0);
        },
    });

    models.Orderline = models.Orderline.extend({

     initialize: function(attributes,options){
            this.sequence = 0;
            SuperOrder.initialize.call(this,attributes,options);
        },


        get_sequence: function(){
            return this.sequence;
        },
        set_quantity: function(quantity, keep_price){
            SuperOrderline.set_quantity.call(this, quantity, keep_price);
            if(this.pos.get_order()!=null)
                this.pos.change_css();
        }
    });




//    models.OrderWidget = models.OrderWidget.extend({

    screens.OrderWidget.include({

        remove_orderline: function(order_line){
        var order = this.pos.get_order();
    	var orderlines = order.get_selected_orderline();
            if(orderlines.length === 0){
                this.renderElement();
            }else{
                order_line.node.parentNode.removeChild(order_line.node);

                // 7572-Siyuan: refresh the sequence when order line is deleted
                this.renderElement();
            }
        },

        renderElement: function(scrollbottom){
//            this.pos_widget.numpad.state.reset();

//            var order  = this.pos.get('selectedOrder');
//            var orderlines = order.get('orderLines');
            var order = this.pos.get_order();
    	    var orderlines = order.get_selected_orderline();

            var el_str  =  $(qweb.render('OrderWidget',{widget:this, order:order, orderlines:orderlines}));

            var el_node = document.createElement('div');
                el_node.innerHTML = _.str.trim(el_str);
                el_node = el_node.childNodes[0];


            var list_container = el_node.querySelector('.orderlines');
            for(var i = 0, len = orderlines.length; i < len; i++){

                // 7572-Siyuan: add the sequence number for order line
                orderlines[i].sequence = i + 1;

                var orderline = this.render_orderline(orderlines[i]);
                list_container.appendChild(orderline);
            }

            if(this.el && this.el.parentNode){
                this.el.parentNode.replaceChild(el_node,this.el);
            }
            this.el = el_node;
            this.update_summary();

            if(scrollbottom){
                this.el.querySelector('.order-scroller').scrollTop = 100 * orderlines.length;
            }
        }

    });


//    models.PosModel = models.PosModel.extend({
//        get_item_count: function(){
//            var count=0, current_order = this.get_order();
//            _.each(current_order.get_orderlines(), function(orderline){
//                count+=orderline.quantity;
//            });
//
//            current_order.item_count = count;
//            return count
//        },
//        change_css: function(){
//            var current_order = this.get_order();
//            current_order.item_count = this.get_item_count();
//            $('#item_qty').text("Total Qty: "+current_order.item_count);
//        }
//    });
//
//    models.Order = models.Order.extend({
//        initialize: function(attributes,options){
//            this.item_count = 0;
//            SuperOrder.initialize.call(this,attributes,options);
//        }
//    });
//
//    models.Orderline = models.Orderline.extend({
//
//    initialize: function(attributes,options){
//            SuperOrderline.initialize.call(this,attributes,options);
//             this.sequence = 0;
//        },
//        set_quantity: function(quantity, keep_price){
//            SuperOrderline.set_quantity.call(this, quantity, keep_price);
//            if(this.pos.get_order()!=null)
//                this.pos.change_css();
//        },
//        get_sequence: function(){
//            return this.sequence;
//        },
//    });
//
//
//        module.OrderWidget = module.OrderWidget.extend({
//
//         remove_orderline: function(order_line){
//        var order = this.pos.get_order();
//    	var orderlines = order.get_selected_orderline();
//            if(orderlines.length === 0){
//                this.renderElement();
//            }else{
//                order_line.node.parentNode.removeChild(order_line.node);
//
//                // 7572-Siyuan: refresh the sequence when order line is deleted
//                this.renderElement();
//            }
//        },
//
//
//        renderElement: function(scrollbottom){
//            this.pos_widget.numpad.state.reset();
//            var order = this.pos.get_order();
//    	    var orderlines = order.get_selected_orderline();
//
////            var order  = this.pos.get('selectedOrder');
////            var orderlines = order.get('orderLines').models;
//
//            var el_str  = qweb.render('OrderWidget',{widget:this, order:order, orderlines:orderlines});
//
//            var el_node = document.createElement('div');
//                el_node.innerHTML = _.str.trim(el_str);
//                el_node = el_node.childNodes[0];
//
//
//            var list_container = el_node.querySelector('.orderlines');
//            for(var i = 0, len = orderlines.length; i < len; i++){
//
//                // 7572-Siyuan: add the sequence number for order line
//                orderlines[i].sequence = i + 1;
//
//                var orderline = this.render_orderline(orderlines[i]);
//                list_container.appendChild(orderline);
//            }
//
//            if(this.el && this.el.parentNode){
//                this.el.parentNode.replaceChild(el_node,this.el);
//            }
//            this.el = el_node;
//            this.update_summary();
//
//            if(scrollbottom){
//                this.el.querySelector('.order-scroller').scrollTop = 100 * orderlines.length;
//            }
//        },
//
//
//
//    });


});