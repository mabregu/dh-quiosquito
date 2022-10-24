const Invoice = (sequelize, DataTypes) => {
    const model = sequelize.define('Invoice', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'approved'
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
        tableName: 'invoices',
    });

    model.associate = (models) => {
        model.belongsTo(models.users, {
            foreignKey: 'user_id',
            as: 'user'
        });
        model.hasMany(models.InvoiceDetail, {
            foreignKey: 'invoice_id',
            as: 'items'
        });
    }

    return model;
};

module.exports = Invoice;