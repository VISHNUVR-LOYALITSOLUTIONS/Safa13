# -*- coding: utf-8 -*-
# from odoo import http


# class MaginPerInPo(http.Controller):
#     @http.route('/magin_per_in_po/magin_per_in_po/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/magin_per_in_po/magin_per_in_po/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('magin_per_in_po.listing', {
#             'root': '/magin_per_in_po/magin_per_in_po',
#             'objects': http.request.env['magin_per_in_po.magin_per_in_po'].search([]),
#         })

#     @http.route('/magin_per_in_po/magin_per_in_po/objects/<model("magin_per_in_po.magin_per_in_po"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('magin_per_in_po.object', {
#             'object': obj
#         })
