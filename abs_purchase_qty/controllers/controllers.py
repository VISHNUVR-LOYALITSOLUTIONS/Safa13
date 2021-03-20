# -*- coding: utf-8 -*-
# from odoo import http


# class AbsPurchaseQty(http.Controller):
#     @http.route('/abs_purchase_qty/abs_purchase_qty/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/abs_purchase_qty/abs_purchase_qty/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('abs_purchase_qty.listing', {
#             'root': '/abs_purchase_qty/abs_purchase_qty',
#             'objects': http.request.env['abs_purchase_qty.abs_purchase_qty'].search([]),
#         })

#     @http.route('/abs_purchase_qty/abs_purchase_qty/objects/<model("abs_purchase_qty.abs_purchase_qty"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('abs_purchase_qty.object', {
#             'object': obj
#         })
