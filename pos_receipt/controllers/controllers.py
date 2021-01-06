# -*- coding: utf-8 -*-
# from odoo import http


# class PosReceipt(http.Controller):
#     @http.route('/pos_receipt/pos_receipt/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_receipt/pos_receipt/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_receipt.listing', {
#             'root': '/pos_receipt/pos_receipt',
#             'objects': http.request.env['pos_receipt.pos_receipt'].search([]),
#         })

#     @http.route('/pos_receipt/pos_receipt/objects/<model("pos_receipt.pos_receipt"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_receipt.object', {
#             'object': obj
#         })
