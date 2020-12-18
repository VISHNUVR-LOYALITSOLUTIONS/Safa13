# -*- coding: utf-8 -*-

from odoo import models, fields, api


class PosConfig(models.Model):
    _inherit = 'pos.config'

    stock_location_id = fields.Many2one(
        comodel_name='stock.location',
        related='picking_type_id.default_location_src_id',
        string="Location", store=True,
        readonly=True,
    )
