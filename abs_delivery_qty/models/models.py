# -*- coding: utf-8 -*-

from odoo import models, fields, api


class StockPicking(models.Model):
    _inherit = 'stock.picking'

    total_delivered_qty = fields.Integer(string='Total Quantity', compute='_total_delivered_product_qty',
                                    help="Total Quantity")

    def _total_delivered_product_qty(self):
        for record in self:
            total_qty = 0
            for line in record.move_line_ids_without_package:
                total_qty = total_qty + line.qty_done
            record.total_delivered_qty = total_qty
