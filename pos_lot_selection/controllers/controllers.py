# -*- coding: utf-8 -*-
# from odoo import http


# class PosLotSelection(http.Controller):
#     @http.route('/pos_lot_selection/pos_lot_selection/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_lot_selection/pos_lot_selection/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_lot_selection.listing', {
#             'root': '/pos_lot_selection/pos_lot_selection',
#             'objects': http.request.env['pos_lot_selection.pos_lot_selection'].search([]),
#         })

#     @http.route('/pos_lot_selection/pos_lot_selection/objects/<model("pos_lot_selection.pos_lot_selection"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_lot_selection.object', {
#             'object': obj
#         })
