# -*- coding: utf-8 -*-

from odoo import models, fields, api


class AccountMove(models.Model):
    _inherit = 'account.move'

    total_invoiced_qty = fields.Integer(string='Total Quantity', compute='_total_invoiced_product_qty',
                                             help="Total Quantity")

    def _total_invoiced_product_qty(self):
        for record in self:
            total_qty = 0
            for line in record.invoice_line_ids:
                total_qty = total_qty + line.quantity
            record.total_invoiced_qty = total_qty