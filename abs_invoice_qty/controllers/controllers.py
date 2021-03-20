# -*- coding: utf-8 -*-
# from odoo import http


# class AbsInvoiceQty(http.Controller):
#     @http.route('/abs_invoice_qty/abs_invoice_qty/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/abs_invoice_qty/abs_invoice_qty/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('abs_invoice_qty.listing', {
#             'root': '/abs_invoice_qty/abs_invoice_qty',
#             'objects': http.request.env['abs_invoice_qty.abs_invoice_qty'].search([]),
#         })

#     @http.route('/abs_invoice_qty/abs_invoice_qty/objects/<model("abs_invoice_qty.abs_invoice_qty"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('abs_invoice_qty.object', {
#             'object': obj
#         })
