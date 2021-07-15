# -*- coding: utf-8 -*-
# from odoo import http


# class PosSequence(http.Controller):
#     @http.route('/pos_sequence/pos_sequence/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_sequence/pos_sequence/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_sequence.listing', {
#             'root': '/pos_sequence/pos_sequence',
#             'objects': http.request.env['pos_sequence.pos_sequence'].search([]),
#         })

#     @http.route('/pos_sequence/pos_sequence/objects/<model("pos_sequence.pos_sequence"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_sequence.object', {
#             'object': obj
#         })
