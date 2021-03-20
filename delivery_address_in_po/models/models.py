# -*- coding: utf-8 -*-

from odoo import models, fields, api


class PurchaseOrder(models.Model):
    _inherit = 'purchase.order'

    delivery_address_id = fields.Many2one('res.partner', string='Delivery Address', required=True,
                                          domain="['|', ('company_id', '=', False), ('company_id', '=', company_id)]",)

