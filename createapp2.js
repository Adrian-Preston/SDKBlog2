"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mendixplatformsdk_1 = require("mendixplatformsdk");
const mendixmodelsdk_1 = require("mendixmodelsdk");
main().catch(console.error);
async function main() {
    const client = new mendixplatformsdk_1.MendixPlatformClient();
    // Create the app
    const app = await client.createNewApp("SDKTestApp", { summary: "Test App created using the Mendix SDKs", templateId: "5cdf7b82-e902-4b8d-b0dd-bdd939c9e82f" });
    console.log("App created with App ID: " + app.appId);
    // Open a working copy
    const workingCopy = await app.createTemporaryWorkingCopy("trunk");
    const model = await workingCopy.openModel();
    // Create a new module
    const module = mendixmodelsdk_1.projects.Module.createIn(model.allProjects()[0]);
    module.name = "SDKModule";
    // Set up module security
    const moduleSecurity = mendixmodelsdk_1.security.ModuleSecurity.createIn(module);
    const adminRole = mendixmodelsdk_1.security.ModuleRole.createIn(moduleSecurity);
    adminRole.name = "Admin";
    const userRole = mendixmodelsdk_1.security.ModuleRole.createIn(moduleSecurity);
    userRole.name = "User";
    // Create the module domain model
    const domainModel = mendixmodelsdk_1.domainmodels.DomainModel.createIn(module);
    // Make the Order Status enumeration with its values
    const statusEnumeration = mendixmodelsdk_1.enumerations.Enumeration.createIn(module);
    statusEnumeration.name = "ENUM_Status";
    createEnumerationOption(model, statusEnumeration, "_New", "New");
    createEnumerationOption(model, statusEnumeration, "Hold", "On Hold");
    createEnumerationOption(model, statusEnumeration, "Progress", "In Progress");
    createEnumerationOption(model, statusEnumeration, "Completed", "Completed");
    // Create the Order Line Entity and attributes
    const orderLineEntity = createEntity(domainModel, "OrderLine", 100, 100, "The Order Line entity created using the Model SDK");
    const orderLineIdAttribute = createAttribute(orderLineEntity, "OrderLineId", mendixmodelsdk_1.domainmodels.IntegerAttributeType.create(model), "", "The Id of this Order Line unique within an order created using the Model SDK");
    const orderLineValueAttribute = createAttribute(orderLineEntity, "OrderLineValue", mendixmodelsdk_1.domainmodels.DecimalAttributeType.create(model), "", "The Value of this Order Line created using the Model SDK");
    const orderLineProductNameAttributeType = mendixmodelsdk_1.domainmodels.StringAttributeType.create(model);
    orderLineProductNameAttributeType.length = 300;
    const orderLineProductNameAttribute = createAttribute(orderLineEntity, "ProductName", orderLineProductNameAttributeType, "Happy Days", "The name of the Product the subject of this Order Line created using the Model SDK");
    addAttributeRequiredRule(model, orderLineEntity, orderLineProductNameAttribute, "A Product Name must be entered");
    // Create the Order Entity and its attributes
    const orderEntity = createEntity(domainModel, "Order", 500, 100, "The Order Entity specializing from System.FileDocument created using the Model SDK");
    const orderEntityGeneralization = mendixmodelsdk_1.domainmodels.Generalization.createIn(orderEntity);
    orderEntityGeneralization["__generalization"].updateWithRawValue("System.FileDocument");
    const orderIdAttribute = createAttribute(orderEntity, "OrderId", mendixmodelsdk_1.domainmodels.AutoNumberAttributeType.create(model), "1", "The Id of this Order Id unique accross the system created using the Model SDK");
    const orderValueAttribute = createAttribute(orderEntity, "OrderValue", mendixmodelsdk_1.domainmodels.DecimalAttributeType.create(model), "", "The Value of this Order created using the Model SDK");
    const customerNameAttributeType = mendixmodelsdk_1.domainmodels.StringAttributeType.create(model);
    customerNameAttributeType.length = 100;
    const customerNameAttribute = createAttribute(orderEntity, "CustomerName", customerNameAttributeType, "", "The name of the Customer who raised this Order created using the Model SDK");
    const orderStatusAttributeType = mendixmodelsdk_1.domainmodels.EnumerationAttributeType.create(model);
    orderStatusAttributeType.enumeration = statusEnumeration;
    const orderStatusAttribute = createAttribute(orderEntity, "OrderStatus", orderStatusAttributeType, "_New", "The status of this Order created using the Model SDK");
    // Create the OrderSearch non-persistent Entity
    const orderSearchEntity = createEntity(domainModel, "OrderSearch", 900, 100, "A non-persistent entity used for searching Orders created using the Model SDK");
    const orderSearchEntityNoGeneralization = mendixmodelsdk_1.domainmodels.NoGeneralization.createIn(orderSearchEntity);
    orderSearchEntityNoGeneralization.persistable = false;
    const orderSearchMiniumuValueAttribute = createAttribute(orderSearchEntity, "MinimumValue", mendixmodelsdk_1.domainmodels.DecimalAttributeType.create(model), "", "The search order value minimum value created using the Model SDK");
    const orderSearchMaxiumuValueAttribute = createAttribute(orderSearchEntity, "MaximumValue", mendixmodelsdk_1.domainmodels.DecimalAttributeType.create(model), "", "The search order value maximum value created using the Model SDK");
    // Create the association between the OrderLine and Order Entities
    const association = mendixmodelsdk_1.domainmodels.Association.createIn(domainModel);
    association.name = "OrderLine_Order";
    association.child = orderEntity;
    association.parent = orderLineEntity;
    association.type = mendixmodelsdk_1.domainmodels.AssociationType.Reference;
    association.owner = mendixmodelsdk_1.domainmodels.AssociationOwner.Default;
    association.childConnection = { x: 0, y: 50 };
    association.parentConnection = { x: 100, y: 50 };
    association.documentation = "Association created using the Model SDK";
    const associationDeleteBehavior = mendixmodelsdk_1.domainmodels.AssociationDeleteBehavior.createIn(association);
    associationDeleteBehavior.childDeleteBehavior = mendixmodelsdk_1.domainmodels.DeletingBehavior.DeleteMeAndReferences;
    association.deleteBehavior = associationDeleteBehavior;
    // Set up the security on the new module's Entities
    // Security settings for Order Line Entity for Admin user
    const orderLineEntityAdminAccessRule = createEntityAccessRule(orderLineEntity, true, true, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite, [adminRole]);
    addAttributeMemberAccess(orderLineEntityAdminAccessRule, orderLineIdAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderLineEntityAdminAccessRule, orderLineProductNameAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderLineEntityAdminAccessRule, orderLineValueAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAssociationMemberAccess(orderLineEntityAdminAccessRule, association, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    // Security settings for Order Line Entity for regular user
    const orderLineEntityUserAccessRule = createEntityAccessRule(orderLineEntity, false, false, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly, [userRole]);
    addAttributeMemberAccess(orderLineEntityUserAccessRule, orderLineIdAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderLineEntityUserAccessRule, orderLineProductNameAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderLineEntityUserAccessRule, orderLineValueAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAssociationMemberAccess(orderLineEntityUserAccessRule, association, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    // Security settings for Order Entity for Admin user
    const orderEntityAdminAccessRule = createEntityAccessRule(orderEntity, true, true, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite, [adminRole]);
    addAttributeMemberAccess(orderEntityAdminAccessRule, orderIdAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderEntityAdminAccessRule, orderValueAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderEntityAdminAccessRule, customerNameAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderEntityAdminAccessRule, orderStatusAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.Name", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.FileID", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.DeleteAfterDownload", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.Contents", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.HasContents", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.Size", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    // Security settings for Order Entity for regular user
    const orderEntityUserAccessRule = createEntityAccessRule(orderEntity, false, false, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly, [userRole]);
    addAttributeMemberAccess(orderEntityUserAccessRule, orderIdAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderEntityUserAccessRule, orderValueAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderEntityUserAccessRule, customerNameAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderEntityUserAccessRule, orderStatusAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.Name", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.FileID", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.DeleteAfterDownload", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.Contents", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.HasContents", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.Size", mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly);
    // Security settings for OrderSearch Entity for both Admin and regular users
    const orderSearchEntityUserAccessRule = createEntityAccessRule(orderSearchEntity, true, true, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite, [adminRole, userRole]);
    addAttributeMemberAccess(orderSearchEntityUserAccessRule, orderSearchMiniumuValueAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderSearchEntityUserAccessRule, orderSearchMaxiumuValueAttribute, mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite);
    // Set up the project level security roles. Set Production level security and put the module roles into the project roles
    const projectSecurity = await model.allProjectSecurities()[0].load();
    projectSecurity.securityLevel = mendixmodelsdk_1.security.SecurityLevel.CheckEverything;
    projectSecurity.checkSecurity = true;
    const adminRoleName = projectSecurity.adminUserRoleName;
    const projectAdminRole = projectSecurity.userRoles.find(t => t.name === adminRoleName);
    const projectUserRole = projectSecurity.userRoles.find(t => t.name === "User");
    if (projectAdminRole != undefined)
        projectAdminRole.moduleRoles.push(adminRole);
    if (projectUserRole != undefined)
        projectUserRole.moduleRoles.push(userRole);
    console.log("Committing changes to the repository");
    await model.flushChanges();
    await workingCopy.commitToRepository("trunk", { commitMessage: "App created and modified by my Create App Model SDK script" });
}
function createEnumerationOption(model, enumeration, name, caption_en_US) {
    const value = mendixmodelsdk_1.enumerations.EnumerationValue.createIn(enumeration);
    value.name = name;
    const caption = mendixmodelsdk_1.texts.Text.createInEnumerationValueUnderCaption(value);
    const translation = mendixmodelsdk_1.texts.Translation.create(model);
    translation.text = caption_en_US;
    translation.languageCode = "en_US";
    caption.translations.push(translation);
}
function createEntity(domainModel, name, x, y, documentation) {
    const entity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
    entity.name = name;
    entity.location = { x: x, y: y };
    entity.documentation = documentation;
    return entity;
}
function createAttribute(entity, name, type, defaultValue, documentation) {
    const attribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(entity);
    attribute.name = name;
    attribute.type = type;
    if (defaultValue != undefined) {
        const attributeDefault = mendixmodelsdk_1.domainmodels.StoredValue.createIn(attribute);
        attributeDefault.defaultValue = defaultValue;
        attribute.value = attributeDefault;
    }
    if (documentation != undefined)
        attribute.documentation = documentation;
    return attribute;
}
function addAttributeRequiredRule(model, entity, attribute, message_en_US) {
    const validationRule = mendixmodelsdk_1.domainmodels.ValidationRule.createIn(entity);
    validationRule.attribute = attribute;
    mendixmodelsdk_1.domainmodels.RequiredRuleInfo.createIn(validationRule);
    const text = mendixmodelsdk_1.texts.Text.createInValidationRuleUnderErrorMessage(validationRule);
    const translation = mendixmodelsdk_1.texts.Translation.create(model);
    translation.text = message_en_US;
    translation.languageCode = "en_US";
    text.translations.push(translation);
}
function createEntityAccessRule(entity, allowCreate, allowDelete, defaultMemberRights, roles) {
    const accessRule = mendixmodelsdk_1.domainmodels.AccessRule.createInEntityUnderAccessRules(entity);
    accessRule.allowCreate = allowCreate;
    accessRule.allowDelete = allowDelete;
    accessRule.defaultMemberAccessRights = defaultMemberRights;
    for (var role of roles)
        accessRule.moduleRoles.push(role);
    return accessRule;
}
function addAttributeMemberAccess(accessRule, attribute, accessRights) {
    const memberAccess = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(accessRule);
    memberAccess.accessRights = accessRights;
    memberAccess.attribute = attribute;
}
function addAttributeSystemMemberAccess(accessRule, attribute, accessRights) {
    const memberAccess = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(accessRule);
    memberAccess.accessRights = accessRights;
    memberAccess["__attribute"].updateWithRawValue(attribute);
}
function addAssociationMemberAccess(accessRule, association, accessRights) {
    const memberAccess = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(accessRule);
    memberAccess.accessRights = accessRights;
    memberAccess.association = association;
}
