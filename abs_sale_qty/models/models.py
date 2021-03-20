# -*- coding: utf-8 -*-

from odoo import models, fields, api


class SaleOrder(models.Model):
    _inherit = 'sale.order'

    total_sale_qty = fields.Integer(string='Total Quantity', compute='_total_sale_product_qty',
                                             help="Total Quantity")

    def _total_sale_product_qty(self):
        for record in self:
            total_qty = 0
            for line in record.order_line:
                total_qty = total_qty + line.product_uom_qty
            record.total_sale_qty = total_qty

