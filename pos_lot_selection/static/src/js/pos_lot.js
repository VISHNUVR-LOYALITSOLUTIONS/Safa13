odoo.define("pos_lot_selection.pos_lot", function (require) {
    "use strict";
    var models = require("point_of_sale.models");
    var screens = require('point_of_sale.screens');
    var PopupWidget = require('point_of_sale.popups');
    var rpc = require('web.rpc');
    var core = require('web.core');
    var field_utils = require('web.field_utils');
	var QWeb = core.qweb;
	var gui = require('point_of_sale.gui');

//	models.PosModel = models.PosModel.extend({
//        get_lot: function(product, location_id) {
//            var done = new $.Deferred();
//            session.rpc("/web/dataset/search_read", {
//                "model": "stock.quant",
//                "domain": [
//                    ["location_id", "=", location_id],
//                    ["product_id", "=", product],
//                    ["lot_id", "!=", false]],
//            }, {'async': false}).then(function (result) {
//                var product_lot = [];
//                var lotqty=0;
//
//                if (result.length) {
//                    for (var i = 0; i < result.length; i++) {
//                        var f = 0;
//                        if(i==0){
//                            product_lot.push({
//                                'lot_name': result.records[i].lot_id[1],
//                                'qty': result.records[i].qty,
//                            });
//                        }
//                        else
//                        {
//                            lotqty = result.records[i].qty;
//                            for (var j = 0; j < product_lot.length; j++) {
//                                if(product_lot[j].lot_name ==  result.records[i].lot_id[1] ){
//                                    lotqty = lotqty + product_lot[j].qty;
//                                    product_lot[j].qty = lotqty;
//                                f=1;
//                                break;
//                                }
//                            }
//                            if(f==0){
//                                product_lot.push({
//                                    'lot_name': result.records[i].lot_id[1],
//                                    'qty': lotqty,
//                                });
//                            }
//                        }
//                    }
//                }
//                done.resolve(product_lot);
//            });
//            return done;
//        },
//    });


//

//    var _orderline_super = models.Orderline.prototype;
//    models.Orderline = models.Orderline.extend({
//        compute_lot_lines: function(){
//            var done = new $.Deferred();
//            var compute_lot_lines = _orderline_super.compute_lot_lines.apply(this, arguments);
//            compute_lot_lines.order_line.lot_qty=0;
//            rpc.query({
//                model: 'stock.production.lot',
//                method: 'search_read',
//                args: [[
//                        ["company_id", "=", this.pos.config.company_id[0]],
//                        ["product_id", "=", this.product.id],
//                    ],],
//            }).then(function (result) {
//                var product_lot = [];
//                var lot_qty=0;
//                var lot_name = [];
//                if (result.length) {
//                    for (var i = 0; i < result.length; i++) {
//                        var f = 0;
//                        if(i==0){
//                            product_lot.push({
//                                'lot_name': result[i].name,
//                                'qty': result[i].product_qty,
//                                'exp_date':result[i].use_date
//                            });
//                        }
//                        else
//                        {
//                            lot_qty = result[i].product_qty;
//                            for (var j = 0; j < product_lot.length; j++) {
//                                if(product_lot[j].lot_name ==  result[i].name){
//                                    lot_qty = lot_qty + product_lot[j].qty;
//                                    product_lot[j].qty = lot_qty;
//                                    f=1;
//                                    break;
//                                }
//                            }
//                            if(f==0){
//                                product_lot.push({
//                                    'lot_name': result[i].name,
//                                    'qty': lot_qty,
//                                    'exp_date':result[i].use_date
//                                });
//                            }
//                        }
//                    }
//                }
//                for (var i = 0; i < product_lot.length; i++) {
//                        lot_name.push(product_lot[i].lot_name);
//
//                }
//                compute_lot_lines.lot_name = lot_name;
//                compute_lot_lines.product_lot = product_lot;
//                for (var i = product_lot.length-1; i >=0 ; i--) {
//                     var count =0;
//                    for (var r=compute_lot_lines.models.length-1;r>=0;r--){
//                        if(product_lot[i].lot_name == compute_lot_lines.models[r].attributes['lot_name']) {
//                            count++;
//                        }
//                    }
//                    if(count>=product_lot[i].qty)
//                    {
//                        compute_lot_lines.lot_name.splice(i, 1);
//                    }
//                }
//                done.resolve(compute_lot_lines);
//
//            });
//            return compute_lot_lines;
//        },
//
//    });

//    var _super_order = models.Order.prototype;
//    models.Order = models.Order.extend({
//        display_lot_popup: function() {
//            var order_line = this.get_selected_orderline();
//            if (order_line){
//                var pack_lot_lines =  order_line.compute_lot_lines();
//                if(pack_lot_lines['lot_name']){
//                    this.pos.gui.show_popup('packlotline', {
//                        'title': 'Lot/Serial Number(s) Required',
//                        'pack_lot_lines': pack_lot_lines,
//                        'order': this
//                    });
//                }
//                else{
//                    this.pos.gui.show_popup('error', {
//                         'title': 'Lot/Serial Number(s) Error',
//                        'body':'Lot Quantity of the Product exceeded'
//                    });
//                }
//            }
//        },
//    });
//
//
//
//    screens.ActionpadWidget.include({
//        renderElement: function () {
//            var self = this;
//            this._super();
//            this.$('.pay').click(function(){
//                var order = self.pos.get_order();
//                var has_valid_product_lot = _.every(order.orderlines.models, function(line){
//                    return line.has_valid_product_lot();
//                });
//                if(!has_valid_product_lot){
//                    self.gui.show_popup('error',{
//                        'title':'Empty Serial/Lot Number',
//                        'body':  'One or more product(s) required serial/lot number.',
//                    });
//                }else{
//                    self.gui.show_screen('payment');
//                }
//            });
//            this.$('.set-customer').click(function(){
//                self.gui.show_screen('clientlist');
//            });
//        }
//    });

var PackLotLinePopupWidget = PopupWidget.extend({
template: 'PackLotLinePopupWidget',
events: _.extend({}, PopupWidget.prototype.events, {
        'click .remove-lot': 'remove_lot',
        'keydown': 'add_lot',
        'blur .packlot-line-input': 'lose_input_focus',
        "change .packlot-line-select": "lot_to_input"
    }),

    lot_to_input: function(event) {
        var $select = $(event.target);
        var $option = this.$("select.packlot-line-select option");
        var $input = this.$el.find("input");
        if ($input.length) {
            $input[0].value = $select[0].value;
            $input.blur();
            $input.focus();
        }
        $option.prop('selected', function () {
            return this.defaultSelected;
        });

    },

    render_list: function(order, input_txt) {
        var contents = this.$el[0].querySelector('.packlot-line-select');
        var order = [];
		var args = [
            [["company_id", "=", this.pos.config.company_id[0]],
            ["product_id", "=", this.options.order_line.product.id]],
            ['name', 'product_qty', 'use_date', 'product_id'],
        ];
		rpc.query({
            model: 'stock.production.lot',
            method: 'search_read',
            args: args,
        })
		.then(function(result){
			order = [];
			order = result;
            var product_lots = order;
            for (var i = 0;i < product_lots.length; i++) {
                if (product_lots[i]['use_date']){
                    var use_date = new Date(product_lots[i]['use_date']);
//                    var utc = field_utils.format.datetime(
//                        moment(use_date), {}, {timezone: false});
//                    product_lots[i]['use_date'] = utc;
                    var utc = use_date.getTime() - (use_date.getTimezoneOffset() * 60000);
                    product_lots[i]['use_date'] = new Date(utc).toLocaleString();

                }
                var lot_option_html = QWeb.render('LotOption', {
                    widget: this,
                    product_lots: product_lots[i],
                    product_id:product_lots[i].product_id[0],
                });
                var lot_select_option = document.createElement('option');
                lot_select_option.innerHTML = lot_option_html;
                lot_select_option = lot_select_option.childNodes[1];
                contents.appendChild(lot_select_option);
	        }
	    });
    },

    show: function(options){
        this._super(options);
        this.render_list();
    },

    click_confirm: function(){
        var pack_lot_lines = this.options.pack_lot_lines;
        this.$('.packlot-line-input').each(function(index, el){
            var cid = $(el).attr('cid'),
                lot_name = $(el).val();
            var pack_line = pack_lot_lines.get({cid: cid});
            pack_line.set_lot_name(lot_name);
        });
        pack_lot_lines.remove_empty_model();
        pack_lot_lines.set_quantity_by_lot();
        this.options.order.save_to_db();
        this.options.order_line.trigger('change', this.options.order_line);
        this.gui.close_popup();
    },

    add_lot: function(ev) {
        if (ev.keyCode === $.ui.keyCode.ENTER && this.options.order_line.product.tracking == 'serial'){
            var pack_lot_lines = this.options.pack_lot_lines,
                $input = $(ev.target),
                cid = $input.attr('cid'),
                lot_name = $input.val();

            var lot_model = pack_lot_lines.get({cid: cid});
            lot_model.set_lot_name(lot_name);  // First set current model then add new one
            if(!pack_lot_lines.get_empty_model()){
                var new_lot_model = lot_model.add();
                this.focus_model = new_lot_model;
            }
            pack_lot_lines.set_quantity_by_lot();
            this.renderElement();
            this.focus();
        }
    },

    remove_lot: function(ev){
        var pack_lot_lines = this.options.pack_lot_lines,
            $input = $(ev.target).prev(),
            cid = $input.attr('cid');
        var lot_model = pack_lot_lines.get({cid: cid});
        lot_model.remove();
        pack_lot_lines.set_quantity_by_lot();
        this.renderElement();
    },

    lose_input_focus: function(ev){
        var $input = $(ev.target),
            cid = $input.attr('cid');
        var lot_model = this.options.pack_lot_lines.get({cid: cid});
        lot_model.set_lot_name($input.val());
    },

    focus: function(){
        this.$("input[autofocus]").focus();
        this.focus_model = false;   // after focus clear focus_model on widget
    }



});
gui.define_popup({name:'packlotline', widget:PackLotLinePopupWidget});

});
