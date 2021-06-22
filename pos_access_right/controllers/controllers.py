# -*- coding: utf-8 -*-
from odoo import http

# class PosAccessRight(http.Controller):
#     @http.route('/pos_access_right/pos_access_right/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_access_right/pos_access_right/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_access_right.listing', {
#             'root': '/pos_access_right/pos_access_right',
#             'objects': http.request.env['pos_access_right.pos_access_right'].search([]),
#         })

#     @http.route('/pos_access_right/pos_access_right/objects/<model("pos_access_right.pos_access_right"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_access_right.object', {
#             'object': obj
#         })