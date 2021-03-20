# -*- coding: utf-8 -*-
# from odoo import http


# class AbsSaleQty(http.Controller):
#     @http.route('/abs_sale_qty/abs_sale_qty/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/abs_sale_qty/abs_sale_qty/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('abs_sale_qty.listing', {
#             'root': '/abs_sale_qty/abs_sale_qty',
#             'objects': http.request.env['abs_sale_qty.abs_sale_qty'].search([]),
#         })

#     @http.route('/abs_sale_qty/abs_sale_qty/objects/<model("abs_sale_qty.abs_sale_qty"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('abs_sale_qty.object', {
#             'object': obj
#         })
