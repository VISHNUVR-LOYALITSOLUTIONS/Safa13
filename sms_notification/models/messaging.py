# -*- coding: utf-8 -*-

from odoo import models, fields, api, _


import logging
_logger = logging.getLogger(__name__)


class SaleOrder(models.Model):
    _inherit = "sale.order"

    def action_confirm(self):
        self.ensure_one()
        res = super(SaleOrder, self).action_confirm()
        # Code to send sms to customer of the order.
        sms_template_objs = self.env["sms.notification.template"].sudo().search(
            [('condition', '=', 'order_confirm'), ('globally_access', '=', False)])
        for sms_template_obj in sms_template_objs:
            mobile = sms_template_obj._get_partner_mobile(self.partner_id)
            if mobile:
                sms_template_obj.send_sms_using_template(
                    mobile, sms_template_obj, obj=self)
        return res


class PosOrder(models.Model):
    _inherit = "pos.order"

    @api.model
    def _process_order(self, order, draft, existing_order):
        res = super(PosOrder, self)._process_order(order, draft, existing_order)

        order = self.env['pos.order'].browse(res) if res else False
        if order and order.partner_id:
            sms_template_objs = self.env["sms.notification.template"].sudo().search(
                [('condition', '=', 'pos_order_placed'), ('globally_access', '=', False)])
            for sms_template_obj in sms_template_objs:
                mobile = sms_template_obj._get_partner_mobile(order.partner_id)
                if mobile:
                    sms_template_obj.send_sms_using_template(
                        mobile, sms_template_obj, obj=order)
        return res

    # def action_cancel(self):
    #     res = super(SaleOrder, self).action_cancel()
    #     sms_template_objs = self.env["sms.notification.template"].sudo().search(
    #         [('condition', '=', 'order_cancel'), ('globally_access', '=', False),
    #          ])
    #     for obj in self:
    #         for sms_template_obj in sms_template_objs:
    #             mobile = sms_template_obj._get_partner_mobile(obj.partner_id)
    #             if mobile:
    #                 sms_template_obj.send_sms_using_template(
    #                     mobile, sms_template_obj, obj=obj)
    #     return res
    #
    # def write(self, vals):
    #     result = super(SaleOrder, self).write(vals)
    #     for res in self:
    #         if res and vals.get("state", False) == 'sent':
    #             sms_template_objs = self.env["sms.notification.template"].sudo().search(
    #                 [('condition', '=', 'order_placed'), ('globally_access', '=', False),
    #                  ])
    #             for sms_template_obj in sms_template_objs:
    #                 mobile = sms_template_obj._get_partner_mobile(
    #                     res.partner_id)
    #                 if mobile:
    #                     sms_template_obj.send_sms_using_template(
    #                         mobile, sms_template_obj, obj=res)
    #     return result


# class stock_picking(models.Model):
#     _inherit = "stock.picking"
#
#     # def write(self, vals):
#     #     result = super(stock_picking, self).write(vals)
#     #     for res in self:
#     #         if res.picking_type_code =='outgoing':
#     #         # if res and vals.get("picking_type_code", 'outgoing'):
#     #             res.send_picking_done_message()
#     #     return result
#
#     # method to send msg on picking done
#     def send_picking_done_message(self):
#         sms_template_objs = self.env["sms.notification.template"].sudo().search(
#             [('condition', '=', 'order_delivered'), ('globally_access', '=', False),
#              ])
#         for sms_template_obj in sms_template_objs:
#             mobile = sms_template_obj._get_partner_mobile(
#                 self.partner_id)
#             if mobile:
#                 sms_template_obj.send_sms_using_template(
#                     mobile, sms_template_obj, obj=self)

# class account_invoice(models.Model):
#     _inherit = "account.move"
#
#     def write(self, vals):
#         result = super(account_invoice, self).write(vals)
#         for res in self:
#             if res and vals.get("state", False) in ["open", "paid", "posted"]:
#                 res.send_invoice_message(vals.get("state"))
#         return result
#
#     # method to send msg for open or paid invoice
#     def send_invoice_message(self, state):
#         if state == 'open':
#             sms_template_objs = self.env["sms.notification.template"].sudo().search(
#                 [('condition', '=', 'invoice_vaildate'), ('globally_access', '=', False)])
#             for sms_template_obj in sms_template_objs:
#                 mobile = sms_template_obj._get_partner_mobile(
#                     self.partner_id)
#                 if mobile:
#                     sms_template_obj.send_sms_using_template(
#                     mobile, sms_template_obj, obj=self)
#         elif state == 'paid':
#             sms_template_objs = self.env["sms.notification.template"].sudo().search(
#                 [('condition', '=', 'invoice_paid'), ('globally_access', '=', False)])
#             for sms_template_obj in sms_template_objs:
#                 mobile = sms_template_obj._get_partner_mobile(
#                     self.partner_id)
#                 if mobile:
#                     sms_template_obj.send_sms_using_template(
#                                 mobile, sms_template_obj, obj=self)
#         elif state == 'posted':
#             sms_template_objs = self.env["sms.notification.template"].sudo().search(
#                 [('condition', '=', 'invoice_vaildate'), ('globally_access', '=', False)])
#             for sms_template_obj in sms_template_objs:
#                 mobile = sms_template_obj._get_partner_mobile(
#                     self.partner_id)
#                 if mobile:
#                     sms_template_obj.send_sms_using_template(
#                                 mobile, sms_template_obj, obj=self)


