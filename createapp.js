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
    const statusEnumerationValue1 = mendixmodelsdk_1.enumerations.EnumerationValue.createIn(statusEnumeration);
    statusEnumerationValue1.name = "_New";
    const statusEnumerationCaption1 = mendixmodelsdk_1.texts.Text.createInEnumerationValueUnderCaption(statusEnumerationValue1);
    const statusEnumerationTranslation1 = mendixmodelsdk_1.texts.Translation.create(model);
    statusEnumerationTranslation1.text = "New";
    statusEnumerationTranslation1.languageCode = "en_US";
    statusEnumerationCaption1.translations.push(statusEnumerationTranslation1);
    const statusEnumerationValue2 = mendixmodelsdk_1.enumerations.EnumerationValue.createIn(statusEnumeration);
    statusEnumerationValue2.name = "Hold";
    const statusEnumerationCaption2 = mendixmodelsdk_1.texts.Text.createInEnumerationValueUnderCaption(statusEnumerationValue2);
    const statusEnumerationTranslation2 = mendixmodelsdk_1.texts.Translation.create(model);
    statusEnumerationTranslation2.text = "On Hold";
    statusEnumerationTranslation2.languageCode = "en_US";
    statusEnumerationCaption2.translations.push(statusEnumerationTranslation2);
    const statusEnumerationValue3 = mendixmodelsdk_1.enumerations.EnumerationValue.createIn(statusEnumeration);
    statusEnumerationValue3.name = "Progress";
    const statusEnumerationCaption3 = mendixmodelsdk_1.texts.Text.createInEnumerationValueUnderCaption(statusEnumerationValue3);
    const statusEnumerationTranslation3 = mendixmodelsdk_1.texts.Translation.create(model);
    statusEnumerationTranslation3.text = "In Progress";
    statusEnumerationTranslation3.languageCode = "en_US";
    statusEnumerationCaption3.translations.push(statusEnumerationTranslation3);
    const statusEnumerationValue4 = mendixmodelsdk_1.enumerations.EnumerationValue.createIn(statusEnumeration);
    statusEnumerationValue4.name = "Completed";
    const statusEnumerationCaption4 = mendixmodelsdk_1.texts.Text.createInEnumerationValueUnderCaption(statusEnumerationValue4);
    const statusEnumerationTranslation4 = mendixmodelsdk_1.texts.Translation.create(model);
    statusEnumerationTranslation4.text = "Completed";
    statusEnumerationTranslation4.languageCode = "en_US";
    statusEnumerationCaption4.translations.push(statusEnumerationTranslation4);
    // Create the Order Line Entity and attributes
    const orderLineEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
    orderLineEntity.name = "OrderLine";
    orderLineEntity.location = { x: 100, y: 100 };
    orderLineEntity.documentation = "The Order Line entity created using the Model SDK";
    const orderLineIdAttributeType = mendixmodelsdk_1.domainmodels.IntegerAttributeType.create(model);
    const orderLineIdAttributeDefault = mendixmodelsdk_1.domainmodels.StoredValue.create(model);
    orderLineIdAttributeDefault.defaultValue = "";
    const orderLineIdAttribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(orderLineEntity);
    orderLineIdAttribute.name = "OrderLineId";
    orderLineIdAttribute.type = orderLineIdAttributeType;
    orderLineIdAttribute.value = orderLineIdAttributeDefault;
    orderLineIdAttribute.documentation = "The Id of this Order Line unique within an order created using the Model SDK";
    const orderLineValueAttributeType = mendixmodelsdk_1.domainmodels.DecimalAttributeType.create(model);
    const orderLineValueAttributeDefault = mendixmodelsdk_1.domainmodels.StoredValue.create(model);
    orderLineValueAttributeDefault.defaultValue = "";
    const orderLineValueAttribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(orderLineEntity);
    orderLineValueAttribute.name = "OrderLineValue";
    orderLineValueAttribute.type = orderLineValueAttributeType;
    orderLineValueAttribute.value = orderLineValueAttributeDefault;
    orderLineValueAttribute.documentation = "The Value of this Order Line created using the Model SDK";
    const orderLineProductNameAttributeType = mendixmodelsdk_1.domainmodels.StringAttributeType.create(model);
    orderLineProductNameAttributeType.length = 300;
    const orderLineProductNameAttributeDefault = mendixmodelsdk_1.domainmodels.StoredValue.create(model);
    orderLineProductNameAttributeDefault.defaultValue = "Happy Days";
    const orderLineProductNameAttribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(orderLineEntity);
    orderLineProductNameAttribute.name = "ProductName";
    orderLineProductNameAttribute.type = orderLineProductNameAttributeType;
    orderLineProductNameAttribute.value = orderLineProductNameAttributeDefault;
    orderLineProductNameAttribute.documentation = "The name of the Product the subject of this Order Line created using the Model SDK";
    const orderLineEntityValidationRule1 = mendixmodelsdk_1.domainmodels.ValidationRule.createIn(orderLineEntity);
    orderLineEntityValidationRule1.attribute = orderLineProductNameAttribute;
    mendixmodelsdk_1.domainmodels.RequiredRuleInfo.createIn(orderLineEntityValidationRule1);
    const orderLineEntityValidationRuleText = mendixmodelsdk_1.texts.Text.createInValidationRuleUnderErrorMessage(orderLineEntityValidationRule1);
    const orderLineEntityValidationRuleTranslation = mendixmodelsdk_1.texts.Translation.create(model);
    orderLineEntityValidationRuleTranslation.text = "A Product Name must be entered";
    orderLineEntityValidationRuleTranslation.languageCode = "en_US";
    orderLineEntityValidationRuleText.translations.push(orderLineEntityValidationRuleTranslation);
    // Create the Order Entity and its attributes
    const orderEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
    orderEntity.name = "Order";
    orderEntity.location = { x: 500, y: 100 };
    orderEntity.documentation = "The Order Entity specializing from System.FileDocument created using the Model SDK";
    const orderEntityGeneralization = mendixmodelsdk_1.domainmodels.Generalization.createIn(orderEntity);
    orderEntityGeneralization["__generalization"].updateWithRawValue("System.FileDocument");
    const orderIdAttributeType = mendixmodelsdk_1.domainmodels.AutoNumberAttributeType.create(model);
    const orderIdAttributeDefault = mendixmodelsdk_1.domainmodels.StoredValue.create(model);
    orderIdAttributeDefault.defaultValue = "1";
    const orderIdAttribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(orderEntity);
    orderIdAttribute.name = "OrderId";
    orderIdAttribute.type = orderIdAttributeType;
    orderIdAttribute.value = orderIdAttributeDefault;
    orderIdAttribute.documentation = "The Id of this Order Id unique accross the system created using the Model SDK";
    const orderValueAttributeType = mendixmodelsdk_1.domainmodels.DecimalAttributeType.create(model);
    const orderValueAttributeDefault = mendixmodelsdk_1.domainmodels.StoredValue.create(model);
    orderValueAttributeDefault.defaultValue = "";
    const orderValueAttribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(orderEntity);
    orderValueAttribute.name = "OrderValue";
    orderValueAttribute.type = orderValueAttributeType;
    orderValueAttribute.value = orderValueAttributeDefault;
    orderValueAttribute.documentation = "The Value of this Order created using the Model SDK";
    const customerNameAttributeType = mendixmodelsdk_1.domainmodels.StringAttributeType.create(model);
    customerNameAttributeType.length = 100;
    const customerNameAttributeDefault = mendixmodelsdk_1.domainmodels.StoredValue.create(model);
    customerNameAttributeDefault.defaultValue = "";
    const customerNameAttribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(orderEntity);
    customerNameAttribute.name = "CustomerName";
    customerNameAttribute.type = customerNameAttributeType;
    customerNameAttribute.value = customerNameAttributeDefault;
    customerNameAttribute.documentation = "The name of the Customer who raised this Order created using the Model SDK";
    const orderStatusAttributeType = mendixmodelsdk_1.domainmodels.EnumerationAttributeType.create(model);
    orderStatusAttributeType.enumeration = statusEnumeration;
    const orderStatusAttributeDefault = mendixmodelsdk_1.domainmodels.StoredValue.create(model);
    orderStatusAttributeDefault.defaultValue = "_New";
    const orderStatusAttribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(orderEntity);
    orderStatusAttribute.name = "OrderStatus";
    orderStatusAttribute.type = orderStatusAttributeType;
    orderStatusAttribute.value = orderStatusAttributeDefault;
    orderStatusAttribute.documentation = "The status of this Order created using the Model SDK";
    // Create the OrderSearch non-persistent Entity
    const orderSearchEntity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
    orderSearchEntity.name = "OrderSearch";
    orderSearchEntity.location = { x: 900, y: 100 };
    orderSearchEntity.documentation = "A non-persistent entity used for searching Orders created using the Model SDK";
    const orderSearchEntityNoGeneralization = mendixmodelsdk_1.domainmodels.NoGeneralization.createIn(orderSearchEntity);
    orderSearchEntityNoGeneralization.persistable = false;
    const orderSearchMinimumValueAttributeType = mendixmodelsdk_1.domainmodels.DecimalAttributeType.create(model);
    const orderSearchMinimumValueDefaultValue = mendixmodelsdk_1.domainmodels.StoredValue.create(model);
    orderSearchMinimumValueDefaultValue.defaultValue = "";
    const orderSearchMiniumuValueAttribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(orderSearchEntity);
    orderSearchMiniumuValueAttribute.name = "MinimumValue";
    orderSearchMiniumuValueAttribute.type = orderSearchMinimumValueAttributeType;
    orderSearchMiniumuValueAttribute.value = orderSearchMinimumValueDefaultValue;
    orderSearchMiniumuValueAttribute.documentation = "The search order value minimum value created using the Model SDK";
    const orderSearchMaximumValueAttributeType = mendixmodelsdk_1.domainmodels.DecimalAttributeType.create(model);
    const orderSearchMaximumValueDefaultValue = mendixmodelsdk_1.domainmodels.StoredValue.create(model);
    orderSearchMaximumValueDefaultValue.defaultValue = "";
    const orderSearchMaxiumuValueAttribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(orderSearchEntity);
    orderSearchMaxiumuValueAttribute.name = "MaximumValue";
    orderSearchMaxiumuValueAttribute.type = orderSearchMaximumValueAttributeType;
    orderSearchMaxiumuValueAttribute.value = orderSearchMaximumValueDefaultValue;
    orderSearchMaxiumuValueAttribute.documentation = "The search order value maximum value created using the Model SDK";
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
    const orderLineEntityAdminAccessRule = mendixmodelsdk_1.domainmodels.AccessRule.createInEntityUnderAccessRules(orderLineEntity);
    orderLineEntityAdminAccessRule.allowCreate = true;
    orderLineEntityAdminAccessRule.allowDelete = true;
    orderLineEntityAdminAccessRule.defaultMemberAccessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    orderLineEntityAdminAccessRule.moduleRoles.push(adminRole);
    const orderLineEntityAdminAccessOrderLineId = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderLineEntityAdminAccessRule);
    orderLineEntityAdminAccessOrderLineId.attribute = orderLineIdAttribute;
    orderLineEntityAdminAccessOrderLineId.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderLineEntityAdminAccessProductName = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderLineEntityAdminAccessRule);
    orderLineEntityAdminAccessProductName.attribute = orderLineProductNameAttribute;
    orderLineEntityAdminAccessProductName.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderLineEntityAdminAccessOrderLineValue = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderLineEntityAdminAccessRule);
    orderLineEntityAdminAccessOrderLineValue.attribute = orderLineValueAttribute;
    orderLineEntityAdminAccessOrderLineValue.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderLineEntityAdminAccessAssociation = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderLineEntityAdminAccessRule);
    orderLineEntityAdminAccessAssociation.association = association;
    orderLineEntityAdminAccessAssociation.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    // Security settings for Order Line Entity for regular user
    const orderLineEntityUserAccessRule = mendixmodelsdk_1.domainmodels.AccessRule.createInEntityUnderAccessRules(orderLineEntity);
    orderLineEntityUserAccessRule.allowCreate = false;
    orderLineEntityUserAccessRule.allowDelete = false;
    orderLineEntityUserAccessRule.defaultMemberAccessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    orderLineEntityUserAccessRule.moduleRoles.push(userRole);
    const orderLineEntityUserAccessOrderLineId = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderLineEntityUserAccessRule);
    orderLineEntityUserAccessOrderLineId.attribute = orderLineIdAttribute;
    orderLineEntityUserAccessOrderLineId.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderLineEntityUserAccessProductName = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderLineEntityUserAccessRule);
    orderLineEntityUserAccessProductName.attribute = orderLineProductNameAttribute;
    orderLineEntityUserAccessProductName.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderLineEntityUserAccessOrderLineValue = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderLineEntityUserAccessRule);
    orderLineEntityUserAccessOrderLineValue.attribute = orderLineValueAttribute;
    orderLineEntityUserAccessOrderLineValue.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderLineEntityUserAccessAssociation = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderLineEntityUserAccessRule);
    orderLineEntityUserAccessAssociation.association = association;
    orderLineEntityUserAccessAssociation.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    // Security settings for Order Entity for Admin user
    const orderEntityAdminAccessRule = mendixmodelsdk_1.domainmodels.AccessRule.createInEntityUnderAccessRules(orderEntity);
    orderEntityAdminAccessRule.allowCreate = true;
    orderEntityAdminAccessRule.allowDelete = true;
    orderEntityAdminAccessRule.defaultMemberAccessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    orderEntityAdminAccessRule.moduleRoles.push(adminRole);
    const orderEntityAdminAccessOrderId = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessOrderId.attribute = orderIdAttribute;
    orderEntityAdminAccessOrderId.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityAdminAccessOrderValue = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessOrderValue.attribute = orderValueAttribute;
    orderEntityAdminAccessOrderValue.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderEntityAdminAccessCustomerName = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessCustomerName.attribute = customerNameAttribute;
    orderEntityAdminAccessCustomerName.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderEntityAdminAccessOrderStatus = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessOrderStatus.attribute = orderStatusAttribute;
    orderEntityAdminAccessOrderStatus.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderEntityAdminAccessName = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessName["__attribute"].updateWithRawValue("System.FileDocument.Name");
    orderEntityAdminAccessName.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderEntityAdminAccessFileId = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessFileId["__attribute"].updateWithRawValue("System.FileDocument.FileID");
    orderEntityAdminAccessFileId.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityAdminAccessDeleteAfterDownload = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessDeleteAfterDownload["__attribute"].updateWithRawValue("System.FileDocument.DeleteAfterDownload");
    orderEntityAdminAccessDeleteAfterDownload.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderEntityAdminAccessContents = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessContents["__attribute"].updateWithRawValue("System.FileDocument.Contents");
    orderEntityAdminAccessContents.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderEntityAdminAccessHasContents = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessHasContents["__attribute"].updateWithRawValue("System.FileDocument.HasContents");
    orderEntityAdminAccessHasContents.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityAdminAccessSize = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessSize["__attribute"].updateWithRawValue("System.FileDocument.Size");
    orderEntityAdminAccessSize.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    // Security settings for Order Entity for regular user
    const orderEntityUserAccessRule = mendixmodelsdk_1.domainmodels.AccessRule.createInEntityUnderAccessRules(orderEntity);
    orderEntityUserAccessRule.allowCreate = false;
    orderEntityUserAccessRule.allowDelete = false;
    orderEntityUserAccessRule.defaultMemberAccessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    orderEntityUserAccessRule.moduleRoles.push(userRole);
    const orderEntityUserAccessOrderId = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessOrderId.attribute = orderIdAttribute;
    orderEntityUserAccessOrderId.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityUserAccessOrderValue = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessOrderValue.attribute = orderValueAttribute;
    orderEntityUserAccessOrderValue.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityUserAccesCustomerName = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccesCustomerName.attribute = customerNameAttribute;
    orderEntityUserAccesCustomerName.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityUserAccesOrderStatus = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccesOrderStatus.attribute = orderStatusAttribute;
    orderEntityUserAccesOrderStatus.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityUserAccessName = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessName["__attribute"].updateWithRawValue("System.FileDocument.Name");
    orderEntityUserAccessName.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityUserAccessFileId = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessFileId["__attribute"].updateWithRawValue("System.FileDocument.FileID");
    orderEntityUserAccessFileId.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityUserAccessDeleteAfterDownload = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessDeleteAfterDownload["__attribute"].updateWithRawValue("System.FileDocument.DeleteAfterDownload");
    orderEntityUserAccessDeleteAfterDownload.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityUserAccessContents = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessContents["__attribute"].updateWithRawValue("System.FileDocument.Contents");
    orderEntityUserAccessContents.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityUserAccessHasContents = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessHasContents["__attribute"].updateWithRawValue("System.FileDocument.HasContents");
    orderEntityUserAccessHasContents.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    const orderEntityUserAccessSize = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessSize["__attribute"].updateWithRawValue("System.FileDocument.Size");
    orderEntityUserAccessSize.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadOnly;
    // Security settings for OrderSearch Entity for both Admin and regular users
    const orderSearchEntityUserAccessRule = mendixmodelsdk_1.domainmodels.AccessRule.createInEntityUnderAccessRules(orderSearchEntity);
    orderSearchEntityUserAccessRule.allowCreate = true;
    orderSearchEntityUserAccessRule.allowDelete = true;
    orderSearchEntityUserAccessRule.defaultMemberAccessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    orderSearchEntityUserAccessRule.moduleRoles.push(adminRole);
    orderSearchEntityUserAccessRule.moduleRoles.push(userRole);
    const orderSearchEntityUserAccessMinimumValue = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderSearchEntityUserAccessRule);
    orderSearchEntityUserAccessMinimumValue.attribute = orderSearchMiniumuValueAttribute;
    orderSearchEntityUserAccessMinimumValue.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
    const orderSearchEntityUserAccessMaximumValue = mendixmodelsdk_1.domainmodels.MemberAccess.createIn(orderSearchEntityUserAccessRule);
    orderSearchEntityUserAccessMaximumValue.attribute = orderSearchMaxiumuValueAttribute;
    orderSearchEntityUserAccessMaximumValue.accessRights = mendixmodelsdk_1.domainmodels.MemberAccessRights.ReadWrite;
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