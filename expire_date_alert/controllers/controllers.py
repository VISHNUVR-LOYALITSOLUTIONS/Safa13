# -*- coding: utf-8 -*-
# from odoo import http


# class ExpireDateAlert(http.Controller):
#     @http.route('/expire_date_alert/expire_date_alert/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/expire_date_alert/expire_date_alert/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('expire_date_alert.listing', {
#             'root': '/expire_date_alert/expire_date_alert',
#             'objects': http.request.env['expire_date_alert.expire_date_alert'].search([]),
#         })

#     @http.route('/expire_date_alert/expire_date_alert/objects/<model("expire_date_alert.expire_date_alert"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('expire_date_alert.object', {
#             'object': obj
#         })
