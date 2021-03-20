# -*- coding: utf-8 -*-
{
    'name': "Total Invoice Quantity on Customer Invoice/ Vendor Bill and Print",

    'summary': """
        Total Quantity Of Products On Customer Invoice/ Vendor Bill""",

    'description': """
        Total Quantity Of Products On Customer Invoice/ Vendor Bill
    """,

    'author': "Loyal IT Solutions Pvt Ltd",
    'website': "http://www.loyalitsolutions.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/13.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '13.0.0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'account'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'report/report_invoice.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
