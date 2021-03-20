# -*- coding: utf-8 -*-
# from odoo import http


# class AbsDeliveryQty(http.Controller):
#     @http.route('/abs_delivery_qty/abs_delivery_qty/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/abs_delivery_qty/abs_delivery_qty/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('abs_delivery_qty.listing', {
#             'root': '/abs_delivery_qty/abs_delivery_qty',
#             'objects': http.request.env['abs_delivery_qty.abs_delivery_qty'].search([]),
#         })

#     @http.route('/abs_delivery_qty/abs_delivery_qty/objects/<model("abs_delivery_qty.abs_delivery_qty"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('abs_delivery_qty.object', {
#             'object': obj
#         })
