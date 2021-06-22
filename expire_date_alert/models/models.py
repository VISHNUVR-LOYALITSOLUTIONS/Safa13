# -*- coding: utf-8 -*-

from odoo import models, fields, api,_
from odoo.exceptions import ValidationError, UserError
from datetime import date, timedelta
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT, misc



class StockMoveLine(models.Model):
    _inherit = "stock.move.line"

    expiry_date = fields.Datetime(string="Expiry Date")

class StockPicking(models.Model):
    _inherit = "stock.picking"


    @api.constrains('move_line_ids_without_package')
    def _check_expiry_date(self):
        for i in self.move_line_ids_without_package:
            alert_date = (i.expiry_date.date() - timedelta(days=6 * 30))
                # .strftime(DEFAULT_SERVER_DATETIME_FORMAT)
            if self.scheduled_date.date() <= alert_date:
                raise ValidationError(
                    _("You are not allowed to receive the lot %s." % i.lot_id.name))


