# -*- coding: utf-8 -*-

from odoo import models, fields, api


class PurchaseOrderLine(models.Model):
    _inherit = 'purchase.order.line'

    mrp = fields.Float(string='MRP', digits='Product Price', related='product_id.lst_price')
    margin = fields.Float(string='Margin', digits='Product Price', compute='_compute_product_margin', store=True)
    margin_percentage = fields.Float(string='Margin %', digits='Product Price', compute='_compute_product_margin', store=True)

    @api.depends('mrp', 'price_unit', 'taxes_id')
    def _compute_product_margin(self):
        for line in self:
            product_taxes = line.product_id.taxes_id.filtered(lambda r: r.company_id == line.order_id.company_id)
            taxes = product_taxes.compute_all(line.mrp, line.order_id.currency_id, 1, line.product_id,
                                                         line.order_id.partner_id)
            # purchase_taxes = line.taxes_id.compute_all(line.price_unit, line.order_id.currency_id, 1, line.product_id,
            #                                              line.order_id.partner_id)
            mrp = taxes['total_excluded']
            # margin = taxes['total_excluded'] - purchase_taxes['total_excluded']
            margin = mrp - line.price_unit
            tr = 0
            pr = line.price_unit
            for tax in line.taxes_id:
                tr += tax.amount

            # margin_per = ((((mrp-(mrp*tax_rate))/(100+tax_rate))-pr)/(mrp-mrp*tax_rate/(100+tax_rate)))x100
            margin_per = (margin/mrp)*100 if mrp != 0 else 0
            line.write({'margin': margin,
                        'margin_percentage': margin_per})

