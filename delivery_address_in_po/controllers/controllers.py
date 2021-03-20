# -*- coding: utf-8 -*-
# from odoo import http


# class DeliveryAddressInPo(http.Controller):
#     @http.route('/delivery_address_in_po/delivery_address_in_po/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/delivery_address_in_po/delivery_address_in_po/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('delivery_address_in_po.listing', {
#             'root': '/delivery_address_in_po/delivery_address_in_po',
#             'objects': http.request.env['delivery_address_in_po.delivery_address_in_po'].search([]),
#         })

#     @http.route('/delivery_address_in_po/delivery_address_in_po/objects/<model("delivery_address_in_po.delivery_address_in_po"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('delivery_address_in_po.object', {
#             'object': obj
#         })
