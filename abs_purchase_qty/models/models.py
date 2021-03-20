# -*- coding: utf-8 -*-

from odoo import models, fields, api


class PurchaseOrder(models.Model):
    _inherit = 'purchase.order'

    total_purchase_quantity = fields.Integer(string='Total Quantity', compute='_total_purchase_product_qty',
                                             help="Total Quantity")

    def _total_purchase_product_qty(self):
        for record in self:
            total_qty = 0
            for line in record.order_line:
                total_qty = total_qty + line.product_qty
            record.total_purchase_quantity = total_qty

