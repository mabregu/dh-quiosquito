const InvoiceDetail = (sequelize, DataTypes) => {
    const model = sequelize.define('InvoiceDetail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Invoice',
                key: 'id'
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        timestamps: true,
        tableName: 'invoice_details',
    });

    model.associate = (models) => {
        model.belongsTo(models.Invoice, {
            foreignKey: 'invoice_id',
            as: 'invoice'
        });
        model.belongsTo(models.Products, {
            foreignKey: 'product_id',
            as: 'product'
        });
    }

    return model;
};

module.exports = InvoiceDetail;